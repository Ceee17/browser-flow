"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WorkflowBuilder from "@/components/workflow-builder";

function BuilderContent() {
  const params = useSearchParams();
  const projectId = params.get("projectId") || "";

  if (!projectId) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-xl font-semibold text-slate-900">Workflow Builder</h1>
        <p className="mt-2 text-sm text-slate-500">Select a project first.</p>
      </div>
    );
  }

  return <WorkflowBuilder workflowId={projectId} />;
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading builder...</p>}>
      <BuilderContent />
    </Suspense>
  );
}
