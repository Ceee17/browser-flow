"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { listWorkflows } from "@/lib/api";

type Workflow = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export default function WorkflowsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    if (!projectId) {
      setWorkflows([]);
      setLoading(false);
      return;
    }
    try {
      const data = await listWorkflows(projectId);
      setWorkflows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load workflows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-semibold text-slate-900">Workflows</h1>

      {!projectId ? (
        <p className="mt-4 text-sm text-slate-500">Select a project to view its workflows.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : workflows.length === 0 ? (
            <p className="text-sm text-slate-500">No workflows yet.</p>
          ) : (
            workflows.map((wf) => (
              <div
                key={wf.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-medium text-slate-900">{wf.name}</p>
                {wf.description && <p className="text-sm text-slate-500">{wf.description}</p>}
                <p className="mt-2 text-xs text-slate-400">
                  Updated {new Date(wf.updatedAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
