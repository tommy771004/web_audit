/// <reference types="vite/client" />

declare const process: {
  env: {
    ALLOW_PAID_FALLBACK?: string;
    BROWSER_COLLECTOR_MODE?: string;
    OPENROUTER_API_KEY?: string;
    WEBWRIGHT_LOG_PATHS?: string;
    WEBWRIGHT_REPORT_PATH?: string;
    WEBWRIGHT_SCREENSHOT_PATHS?: string;
    WEBWRIGHT_TASK_ID?: string;
    WEBWRIGHT_TASK_PATH?: string;
    WEBWRIGHT_TRAJECTORY_PATH?: string;
    WEBWRIGHT_WORKSPACE_DIR?: string;
  };
};

declare module "node:fs" {
  export function existsSync(path: string): boolean;
  export function readdirSync(path: string): string[];
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function statSync(path: string): {
    isDirectory(): boolean;
    isFile(): boolean;
  };
}

declare module "node:path" {
  export function dirname(path: string): string;
  export function join(...paths: string[]): string;
}

interface ImportMetaEnv {
  readonly VITE_AUDIT_ENDPOINT?: string;
  readonly VITE_INTAKE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
