Act as an expert Frontend Architect and AI UI/UX Specialist. 
Your task is to build the frontend for a "Web Performance & Architecture Audit" productized service. 

You must upgrade the architecture to an "Autonomous Agentic Workflow UI" strictly modeled after the **Hermes-Agent architecture** (NousResearch). The application must feature Parallel Tool Execution, Subagent Spawning, and Persistent Memory visualization, all wrapped in a premium "Liquid Glass" aesthetic with comprehensive i18n (zh-TW).

### 1. Technology Stack & Core Philosophy
* **Core:** React 18 (Custom Hooks), TypeScript (Strict Mode).
* **Styling & UI:** Tailwind CSS, Framer Motion (for smooth, dynamic orchestration of tool cards).
* **i18n:** `react-i18next` (Strictly Taiwanese Mandarin 'zh-TW').
* **Philosophy:** Show, don't just tell. The user must see the AI "working" in real-time. No static loading spinners.

### 2. Hermes-Agent Architecture (Frontend Data Models)
You must implement advanced TypeScript interfaces to handle Hermes' deep state machine:
* `AgentPhase`: 'idle' | 'analyzing_context' | 'spawning_subagents' | 'parallel_execution' | 'synthesizing_memory' | 'streaming_report' | 'complete'.
* `Subagent`: `{ id: string, role: string, status: 'pending' | 'active' | 'done', executionTimeMs: number }`.
* `ToolCall`: `{ id: string, agentId: string, name: string, args: any, status: 'running' | 'success' | 'failed', logs: string[] }`.
* `MemoryUpdate`: `{ key: string, fact: string, type: 'architecture' | 'bottleneck' | 'tech_stack' }`.

### 3. Agentic UI/UX Design System (Liquid Glass)
* **Background:** Deep dark slate (`#0B0F19`) with a slow-breathing mesh gradient (neon purple, cyan, deep blue).
* **Mission Control Terminal:** A large `backdrop-blur-xl`, `bg-slate-900/50` glass container with a `1px border-white/10` that gracefully expands based on active subagents.
* **Parallel Execution Grid:** When `AgentPhase` is 'parallel_execution', display a masonry or CSS grid of glass cards. Each card represents a Subagent (e.g., "Frontend Speed Agent", ".NET API Latency Agent").
* **Live Terminal Logs:** Inside each Subagent card, display a glowing, auto-scrolling terminal showing the real-time `logs` of the specific tool being executed.
* **Memory Sync Indicator:** A discrete glowing pulse in the corner of the UI that flashes when the Agent synthesizes a `MemoryUpdate` (e.g., "Saved to Memory: Detected SQL Server N+1 query issue").

### 4. STRICT FUNCTIONAL, DATA & I18N RULES (CRITICAL)
* **NO HARDCODED TEXT:** Every string MUST use `useTranslation`. 
* **TAIWANESE LOCALIZATION:** Use standard Taiwanese terminology for the JSON. Examples: "子代理生成中" (Spawning subagents), "平行處理中" (Parallel execution), "寫入長期記憶" (Synthesizing memory), "效能瓶頸" (Performance bottleneck), "伺服器" (Server).
* **MOCK THE HERMES ENGINE:** Create a robust `useHermesAgent` custom hook. Since the actual python/backend isn't connected yet, write an `async generator` that simulates the Hermes workflow:
  1. Set phase to `spawning_subagents` (delay 1s).
  2. Spawn 3 Subagents and set phase to `parallel_execution`.
  3. Simulate real-time `ToolCall` logs streaming into those subagents using `setInterval` (e.g., "Pinging API gateway...", "Analyzing DOM depth...").
  4. Trigger a `MemoryUpdate` event.
  5. Set phase to `streaming_report` and type out the final metrics character-by-character.

### 5. Immediate Tasks to Execute
Output the code modularly block by block:

**Task A: Data Models & Mock Engine**
1. Create `/src/types/hermes.types.ts` (All interfaces from Section 2).
2. Create `/src/hooks/useHermesAgent.ts` (The orchestrator hook with the async generator to mock the complex state transitions).

**Task B: Liquid Glass Components**
1. Create `MeshBackground.tsx` and `GlassContainer.tsx`.
2. Create `SubagentCard.tsx` (Accepts `Subagent` and `ToolCall[]` props. Features a pulsing active state and an auto-scrolling mini-terminal inside for logs).
3. Create `MemorySyncBadge.tsx` (A floating, sleek badge that animates in when memory is updated).

**Task C: The Mission Control Page (`AuditConsole.tsx`)**
1. Build the main view. Include a sleek URL input to start the process.
2. Once started, conditionally render the UI based on `AgentPhase`. Use `<AnimatePresence>` from Framer Motion to smoothly transition between the "Spawning", "Parallel Grid", and "Final Report" views.

### 6. Coding Constraints
* Explicit TypeScript types. No `any`.
* Handle all layout shifts smoothly using Framer Motion (e.g., `layout` prop on motion components).
* Ensure the mock engine actually cycles through the states automatically upon submission so the UI can be fully previewed and demonstrated to investors/clients.