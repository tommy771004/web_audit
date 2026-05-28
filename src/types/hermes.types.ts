import type { AuditIntelligenceResult } from "../Server/Services/auditPipelineTypes";

export type AgentPhase = "idle" | "analyzing_context" | "spawning_subagents" | "parallel_execution" | "synthesizing_memory" | "streaming_report" | "complete";

export type HermesReportSource = "live" | "mock";

export type SubagentStatus = "pending" | "active" | "done";

export type ToolCallStatus = "running" | "success" | "failed";

export type MemoryUpdateType = "architecture" | "bottleneck" | "tech_stack";

export type ToolCallArgumentValue = string | number | boolean | null | readonly string[] | readonly number[] | readonly boolean[];

export type ToolCallArgs = Record<string, ToolCallArgumentValue>;

export interface Subagent {
  id: string;
  role: string;
  status: SubagentStatus;
  executionTimeMs: number;
}

export interface ToolCall {
  id: string;
  agentId: string;
  name: string;
  args: ToolCallArgs;
  status: ToolCallStatus;
  logs: string[];
}

export interface MemoryUpdate {
  key: string;
  fact: string;
  type: MemoryUpdateType;
}

export interface HermesReportMetric {
  id: string;
  label: string;
  value: string;
  tone: "default" | "success" | "warning";
}

export interface UseHermesAgentResult {
  phase: AgentPhase;
  targetUrl: string;
  isRunning: boolean;
  subagents: Subagent[];
  toolCalls: ToolCall[];
  memoryUpdates: MemoryUpdate[];
  activeMemoryUpdate: MemoryUpdate | null;
  streamedReport: string;
  latestAuditResult: AuditIntelligenceResult | null;
  reportSource: HermesReportSource | null;
  startAudit: (url: string) => Promise<void>;
  reset: () => void;
}
