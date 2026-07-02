export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  orgId: string;
  name: string;
  key: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowDefinition {
  id?: string;
  projectId: string;
  version: number;
  name: string;
  description?: string;
  schemaJson: Record<string, unknown>;
  stepsCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ExecutionStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface Execution {
  id: string;
  workflowId: string;
  agentId: string | null;
  status: ExecutionStatus;
  triggeredBy: string | null;
  triggerSource: string;
  startedAt: Date | null;
  finishedAt: Date | null;
  resultJson: Record<string, unknown>;
  createdAt: Date;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface BrowserFlowClientConfig {
  baseUrl: string;
  apiKey: string;
}

export class BrowserFlowClient {
  constructor(private config: BrowserFlowClientConfig) {}

  private authHeader(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async listOrganizations(): Promise<Organization[]> {
    const res = await fetch(
      `${this.config.baseUrl}/api/v1/orgs`,
      { headers: this.authHeader() }
    );
    if (!res.ok) throw new ApiError("ORGS_LIST_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: Organization[] };
    return json.data;
  }

  async createProject(orgId: string, name: string, key: string): Promise<Project> {
    const res = await fetch(`${this.config.baseUrl}/api/v1/projects`, {
      method: "POST",
      headers: this.authHeader(),
      body: JSON.stringify({ orgId, name, key }),
    });
    if (!res.ok) throw new ApiError("PROJECT_CREATE_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: Project };
    return json.data;
  }

  async getWorkflow(
    projectId: string,
    workflowId: string
  ): Promise<WorkflowDefinition> {
    const res = await fetch(
      `${this.config.baseUrl}/api/v1/projects/${projectId}/workflows/${workflowId}`,
      { headers: this.authHeader() }
    );
    if (!res.ok) throw new ApiError("WORKFLOW_GET_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: WorkflowDefinition };
    return json.data;
  }

  async createWorkflow(
    projectId: string,
    workflow: Omit<WorkflowDefinition, "id" | "createdAt" | "updatedAt">
  ): Promise<WorkflowDefinition> {
    const res = await fetch(
      `${this.config.baseUrl}/api/v1/projects/${projectId}/workflows`,
      {
        method: "POST",
        headers: this.authHeader(),
        body: JSON.stringify(workflow),
      }
    );
    if (!res.ok) throw new ApiError("WORKFLOW_CREATE_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: WorkflowDefinition };
    return json.data;
  }

  async triggerExecution(
    projectId: string,
    workflowId: string
  ): Promise<Execution> {
    const res = await fetch(
      `${this.config.baseUrl}/api/v1/projects/${projectId}/workflows/${workflowId}/execute`,
      {
        method: "POST",
        headers: this.authHeader(),
      }
    );
    if (!res.ok) throw new ApiError("EXEC_TRIGGER_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: Execution };
    return json.data;
  }

  async listExecutions(
    projectId: string,
    page = 1,
    pageSize = 20
  ): Promise<Paginated<Execution>> {
    const url = new URL(`${this.config.baseUrl}/api/v1/executions`);
    url.searchParams.set("projectId", projectId);
    url.searchParams.set("page", String(page));
    url.searchParams.set("pageSize", String(pageSize));

    const res = await fetch(url.toString(), { headers: this.authHeader() });
    if (!res.ok) throw new ApiError("EXEC_LIST_FAILED", await this.parseError(res));
    const json = (await res.json()) as { data: Paginated<Execution> };
    return json.data;
  }

  private async parseError(res: Response): Promise<Record<string, string[]>> {
    try {
      const body = (await res.json()) as { error?: ApiError };
      return body.error?.details ?? { message: [body.error?.message ?? "Unknown error"] };
    } catch {
      return { message: ["Request failed"] };
    }
  }
}
