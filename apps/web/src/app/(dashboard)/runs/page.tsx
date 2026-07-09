"use client";

import { useEffect, useState } from "react";

type Run = {
  id: string;
  status: string;
  createdAt: string;
  finishedAt?: string;
};

export default function RunsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder: executions list will be added when executions endpoints are finalized
    setRuns([]);
    setLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-semibold text-slate-900">Runs</h1>
      <p className="mt-2 text-sm text-slate-500">Execution history will appear here.</p>
      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Loading...</p>
      ) : runs.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No runs yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {runs.map((run) => (
            <div key={run.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-medium text-slate-900">{run.id}</p>
              <p className="text-sm text-slate-500">{run.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
