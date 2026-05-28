import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { generateAuditIntelligence } from "./src/Server/Services/auditIntelligence";

function writeJsonResponse(response: ServerResponse, statusCode: number, payload: unknown): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function readJsonBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    request.setEncoding("utf8");
    request.on("data", (chunk: string) => {
      rawBody += chunk;
    });
    request.on("end", () => {
      if (!rawBody.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error("INVALID_JSON_BODY"));
      }
    });
    request.on("error", (error) => {
      reject(error);
    });
  });
}

async function handleAuditApiRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  try {
    const body = await readJsonBody(request);
    const result = await generateAuditIntelligence(body);
    writeJsonResponse(response, result.queued ? 202 : 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected audit API error";
    const statusCode = message === "INVALID_JSON_BODY" || message === "INVALID_AUDIT_PAYLOAD" ? 400 : 502;

    writeJsonResponse(response, statusCode, {
      error: message,
    });
  }
}

function auditDevApiPlugin(): Plugin {
  return {
    name: "audit-dev-api",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0];

        if (request.method !== "POST" || (pathname !== "/api/audit" && pathname !== "/api/intake")) {
          next();
          return;
        }

        await handleAuditApiRequest(request, response);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0];

        if (request.method !== "POST" || (pathname !== "/api/audit" && pathname !== "/api/intake")) {
          next();
          return;
        }

        await handleAuditApiRequest(request, response);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), auditDevApiPlugin()],
});
