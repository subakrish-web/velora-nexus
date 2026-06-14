"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Save,
  Copy,
  Trash2,
  Plus,
  FileCode,
  ChevronDown,
  Terminal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#1E1E1E]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
});

const STARTER_SCRIPTS = [
  {
    id: "welcome",
    name: "Welcome Script",
    language: "javascript",
    code: `// Welcome to Velora Code Editor
// Run automation scripts, test integrations, or prototype AI agent logic.

async function main() {
  const response = await fetch('/api/analytics?period=7d');
  const data = await response.json();

  console.log('=== Velora Analytics (Last 7 Days) ===');
  console.log('Total Revenue: $' + (data.totalRevenue / 100).toFixed(2));
  console.log('Total Orders:', data.totalOrders);
  console.log('Active Products:', data.totalProducts);

  return data;
}

main().catch(console.error);`,
  },
  {
    id: "agent-test",
    name: "Agent Test",
    language: "javascript",
    code: `// Test an AI agent run
async function testAgent(agentId) {
  const res = await fetch(\`/api/agents/\${agentId}/run\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: 'Generate a product description for a premium coffee blend' })
  });

  const result = await res.json();
  console.log('Agent result:', JSON.stringify(result, null, 2));
  return result;
}

// Replace with your agent ID
testAgent('YOUR_AGENT_ID');`,
  },
  {
    id: "webhook-test",
    name: "Webhook Payload",
    language: "json",
    code: `{
  "productPhotoUrl": "https://example.com/product.jpg",
  "audience": "Gen Z fashion enthusiasts aged 18-25",
  "goal": "Drive product awareness and generate sales",
  "brandVoice": "Bold, playful, and authentic",
  "productName": "Summer Glow Serum",
  "platform": "tiktok"
}`,
  },
];

interface Script {
  id: string;
  name: string;
  language: string;
  code: string;
}

interface LogLine {
  type: "log" | "error" | "success";
  text: string;
  ts: string;
}

export default function CodeEditorPage() {
  const [scripts, setScripts] = useState<Script[]>(STARTER_SCRIPTS);
  const [activeId, setActiveId] = useState("welcome");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const active = scripts.find((s) => s.id === activeId) ?? scripts[0];

  const updateCode = useCallback(
    (code: string | undefined) => {
      setScripts((prev) =>
        prev.map((s) => (s.id === activeId ? { ...s, code: code ?? "" } : s))
      );
    },
    [activeId]
  );

  const addLog = (type: LogLine["type"], text: string) => {
    setLogs((prev) => [
      ...prev,
      { type, text, ts: new Date().toLocaleTimeString() },
    ]);
  };

  const runScript = async () => {
    if (!active) return;
    setRunning(true);
    setLogs([]);
    addLog("log", `Running "${active.name}"...`);

    try {
      if (active.language === "json") {
        const parsed = JSON.parse(active.code);
        addLog("success", "Valid JSON:");
        addLog("log", JSON.stringify(parsed, null, 2));
      } else {
        const originalConsole = { ...console };
        const captured: string[] = [];
        console.log = (...args: unknown[]) => {
          const msg = args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ");
          captured.push(msg);
          originalConsole.log(...args);
        };
        console.error = (...args: unknown[]) => {
          captured.push("ERROR: " + args.join(" "));
          originalConsole.error(...args);
        };

        // eslint-disable-next-line no-new-func
        const fn = new Function("fetch", "console", `return (async () => { ${active.code} })()`);
        await fn(fetch.bind(window), console);

        Object.assign(console, originalConsole);
        captured.forEach((line) =>
          addLog(line.startsWith("ERROR:") ? "error" : "log", line)
        );
        addLog("success", "Script completed successfully.");
      }
    } catch (err) {
      addLog("error", String(err));
    } finally {
      setRunning(false);
    }
  };

  const copyCode = () => {
    if (active) navigator.clipboard.writeText(active.code);
  };

  const addScript = () => {
    const id = `script-${Date.now()}`;
    const newScript: Script = {
      id,
      name: "Untitled Script",
      language: "javascript",
      code: "// New script\n",
    };
    setScripts((prev) => [...prev, newScript]);
    setActiveId(id);
  };

  const deleteScript = (id: string) => {
    setScripts((prev) => prev.filter((s) => s.id !== id));
    if (activeId === id) setActiveId(scripts[0]?.id ?? "");
  };

  const setLanguage = (lang: string) => {
    setScripts((prev) =>
      prev.map((s) => (s.id === activeId ? { ...s, language: lang } : s))
    );
    setLangOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-0 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode className="h-5 w-5 text-primary" />
          <h1 className="font-display text-lg">Code Editor</h1>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">Beta</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {active?.language ?? "js"}
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-32 rounded-lg border border-border bg-card py-1 shadow-lg">
                {["javascript", "typescript", "json", "python"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className="flex w-full cursor-pointer items-center px-3 py-1.5 text-xs hover:bg-secondary"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={copyCode} className="cursor-pointer rounded-lg border border-border bg-secondary p-1.5 text-muted-foreground transition-colors hover:text-foreground" title="Copy code">
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={runScript}
            disabled={running}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" />
            {running ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File list sidebar */}
        <div className="flex w-48 shrink-0 flex-col border-r border-border bg-card">
          <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium uppercase tracking-wider">Scripts</span>
            <button onClick={addScript} className="cursor-pointer rounded p-0.5 hover:bg-secondary" title="New script">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul className="flex-1 space-y-0.5 overflow-y-auto p-2">
            {scripts.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveId(s.id)}
                  className={`group flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                    s.id === activeId
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {scripts.length > 1 && (
                    <Trash2
                      onClick={(e) => { e.stopPropagation(); deleteScript(s.id); }}
                      className="hidden h-3 w-3 shrink-0 text-destructive group-hover:block"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Editor + terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Monaco editor */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              key={activeId}
              height="100%"
              language={active?.language ?? "javascript"}
              value={active?.code ?? ""}
              onChange={updateCode}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                lineNumbers: "on",
                renderLineHighlight: "gutter",
                tabSize: 2,
              }}
            />
          </div>

          {/* Terminal output */}
          <div className="h-48 shrink-0 overflow-hidden border-t border-border bg-[#0D0D0D]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Console</span>
              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="ml-auto cursor-pointer text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="h-full overflow-y-auto p-3 font-mono text-xs">
              {logs.length === 0 ? (
                <span className="text-white/20">Press Run to execute the script…</span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 py-0.5">
                    <span className="shrink-0 text-white/30">{log.ts}</span>
                    {log.type === "error" ? (
                      <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-destructive" />
                    ) : log.type === "success" ? (
                      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
                    ) : null}
                    <span className={
                      log.type === "error" ? "text-red-400" :
                      log.type === "success" ? "text-green-400" :
                      "text-white/80"
                    }>
                      {log.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
