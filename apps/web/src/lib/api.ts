import type { Project } from "@browserflow/sdk";

export async function api(path: string, init?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("bf_access_token") : null;
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
  const res = await fetch(base + path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function listProjects() {
  return api("/projects");
}

export async function listWorkflows(projectId: string) {
  return api(`/projects/${projectId}/workflows`);
}

export async function createProject(name: string, key: string) {
  const data = await api("/projects", {
    method: "POST",
    body: JSON.stringify({ name, key }),
  });
  return data as Project;
}
