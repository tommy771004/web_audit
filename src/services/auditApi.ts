interface PostAuditRequestOptions<Payload extends Record<string, unknown>> {
  endpoint?: string;
  defaultEndpoint: string;
  payload: Payload;
  fallbackPayload: Record<string, unknown>;
}

async function readJsonResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function postAuditRequest<Payload extends Record<string, unknown>>({
  endpoint,
  defaultEndpoint,
  payload,
  fallbackPayload,
}: PostAuditRequestOptions<Payload>): Promise<unknown> {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(endpoint ?? defaultEndpoint, requestInit);

    if (!response.ok) {
      throw new Error(`request_failed:${response.status}`);
    }

    return await readJsonResponse(response);
  } catch (error) {
    if (endpoint) {
      throw error;
    }

    const fallbackEndpoint = `data:application/json,${encodeURIComponent(JSON.stringify(fallbackPayload))}`;
    const fallbackResponse = await fetch(fallbackEndpoint);

    if (!fallbackResponse.ok) {
      throw error;
    }

    return await readJsonResponse(fallbackResponse);
  }
}