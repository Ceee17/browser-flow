"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
  type Edge,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeTypes } from "@/components/workflow-node-types";
import type { BuilderNodeData } from "@/components/workflow-node-types";

const STEP_TYPES = [
  { type: "navigate", label: "Navigate", defaultConfig: { url: "https://example.com" } },
  { type: "click", label: "Click", defaultConfig: {} },
  { type: "type", label: "Type", defaultConfig: { text: "" } },
  { type: "wait", label: "Wait", defaultConfig: { duration: 1000 } },
  { type: "screenshot", label: "Screenshot", defaultConfig: {} },
];

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function WorkflowBuilder({ workflowId, initial }: { workflowId: string; initial?: { name: string; steps?: Record<string, unknown> } }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<BuilderNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(initial?.name || "Untitled workflow");

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    if (!initial?.steps || typeof initial.steps !== "object") return;
    const loaded: Node<BuilderNodeData>[] = [];
    const loadedEdges: Edge[] = [];
    const entries = Object.entries(initial.steps as Record<string, any>);
    entries.forEach(([key, step]: [string, any], idx: number) => {
      loaded.push({
        id: key,
        type: "base",
        position: { x: idx % 5 * 240, y: Math.floor(idx / 5) * 120 },
        data: { label: step.type || key, stepType: step.type || key, config: step || {} } as BuilderNodeData,
      });
      if (idx > 0) {
        loadedEdges.push({ id: `e-${entries[idx - 1][0]}-${key}`, source: entries[idx - 1][0], target: key, animated: true });
      }
    });
    setNodes(loaded);
    setEdges(loadedEdges);
  }, [initial?.steps, setNodes, setEdges]);

  const addNode = (stepType: string) => {
    const def = STEP_TYPES.find((s) => s.type === stepType);
    const id = uid();
    const position = { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 };
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "base",
        position,
        data: { label: def?.label || stepType, stepType, config: def?.defaultConfig || {} } as BuilderNodeData,
      } as Node<BuilderNodeData>,
    ]);
  };

  const save = async () => {
    setSaving(true);
    try {
      const steps: Record<string, any> = {};
      nodes.forEach((node) => {
        steps[node.id] = {
          id: node.id,
          type: node.data.stepType,
          ...node.data.config,
        };
      });
      const payload = {
        name,
        schemaJson: { version: "1.0", name, start: nodes[0]?.id, steps },
      };
      const token = typeof window !== "undefined" ? localStorage.getItem("bf_access_token") : null;
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
      const res = await fetch(`${base}/projects/${workflowId}/workflows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      alert("Workflow saved.");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-4">
      <aside className="w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Steps</h2>
        <div className="mt-3 space-y-2">
          {STEP_TYPES.map((step) => (
            <button
              key={step.type}
              onClick={() => addNode(step.type)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 hover:border-brand-500"
            >
              + {step.label}
            </button>
          ))}
        </div>
        <div className="mt-4 border-t border-slate-200 pt-3">
          <label className="block text-sm font-medium text-slate-700">Workflow name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            onClick={save}
            disabled={saving || nodes.length === 0}
            className="mt-3 w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save workflow"}
          </button>
        </div>
      </aside>

      <div className="flex-1 rounded-xl border border-slate-200 bg-white shadow-sm">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NodeTypes}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
