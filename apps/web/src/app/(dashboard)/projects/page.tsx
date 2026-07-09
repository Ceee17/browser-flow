"use client";

import { useEffect, useState } from "react";
import { listProjects, createProject } from "@/lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Array<{ id: string; name: string; key: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  const load = async () => {
    try {
      const data = await listProjects();
      setProjects(Array.isArray(data) ? data : data.items || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      await createProject(name, key);
      setName("");
      setKey("");
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
      </div>

      <form onSubmit={onCreate} className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-medium text-slate-700">Create project</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            placeholder="KEY"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={creating}
          className="mt-3 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create project"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          projects.map((project) => (
            <a
              key={project.id}
              href={`/workflows?projectId=${project.id}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-brand-500"
            >
              <div>
                <p className="font-medium text-slate-900">{project.name}</p>
                <p className="text-sm text-slate-500">{project.key}</p>
              </div>
              <span className="text-sm text-brand-600">Open</span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
