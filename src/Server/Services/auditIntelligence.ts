import { synthesizeAudit } from "./auditSynthesis";
import { collectBrowserEvidence } from "./browserCollector";
import { collectDeterministicEvidence } from "./deterministicCollector";
import type { AuditIntelligenceResult } from "./auditPipelineTypes";
import { normalizeAuditRequestPayload } from "./auditPipelineTypes";

export async function generateAuditIntelligence(payload: unknown): Promise<AuditIntelligenceResult> {
  const normalizedPayload = normalizeAuditRequestPayload(payload);

  if (!normalizedPayload.url) {
    throw new Error("INVALID_AUDIT_PAYLOAD");
  }

  const deterministic = await collectDeterministicEvidence(normalizedPayload);
  const browser = await collectBrowserEvidence(normalizedPayload, deterministic);
  const synthesis = await synthesizeAudit(normalizedPayload, {
    deterministic,
    browser,
  });

  return {
    ...synthesis,
    generatedAt: new Date().toISOString(),
    request: normalizedPayload,
    evidence: {
      deterministic,
      browser,
    },
  };
}