"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";

export type BuilderNodeData = {
  label: string;
  stepType: string;
  config: Record<string, unknown>;
};

function BaseNode({ data, selected }: NodeProps<BuilderNodeData>) {
  return (
    <div
      className={
        "min-w-[200px] rounded-xl border bg-white p-3 shadow-sm " +
        (selected ? "border-brand-500 ring-2 ring-brand-100" : "border-slate-200")
      }
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{data.label}</p>
        <span className="text-xs text-slate-500">{data.stepType}</span>
      </div>
      <pre className="mt-2 max-h-32 overflow-auto text-xs text-slate-600">
        {JSON.stringify(data.config, null, 2)}
      </pre>
      <Handle type="target" position={Position.Top} className="h-2 w-2 bg-slate-400" />
      <Handle type="source" position={Position.Bottom} className="h-2 w-2 bg-slate-400" />
    </div>
  );
}

export const NodeTypes = {
  base: memo(BaseNode),
};
