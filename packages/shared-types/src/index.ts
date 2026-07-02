export type UUID = string;

export type OrgRole = "owner" | "admin" | "member";

export interface Organization {
  id: UUID;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: UUID;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Membership {
  id: UUID;
  orgId: UUID;
  userId: UUID;
  role: OrgRole;
  createdAt: Date;
}

export interface Project {
  id: UUID;
  orgId: UUID;
  name: string;
  key: string;
  createdBy: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: UUID;
  orgId: UUID;
  projectId: UUID;
  name: string;
  status: "online" | "offline" | "busy";
  lastHeartbeatAt: Date | null;
  metaJson: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkflowStepType =
  | "navigate"
  | "click"
  | "dblclick"
  | "hover"
  | "type"
  | "press"
  | "wait"
  | "screenshot"
  | "scroll"
  | "upload"
  | "download"
  | "extract-text"
  | "extract-table"
  | "execute-script"
  | "condition"
  | "loop"
  | "error";

export interface StepBase {
  id: string;
  type: WorkflowStepType;
  selectors?: Record<string, unknown>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  onFail?: "stop" | "continue" | "branch";
}

export interface WorkflowDefinition {
  id?: UUID;
  projectId: UUID;
  version: number;
  name: string;
  description?: string;
  schemaJson: Record<string, unknown>;
  stepsCount: number;
  createdBy: UUID;
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
  id: UUID;
  workflowId: UUID;
  agentId: UUID | null;
  status: ExecutionStatus;
  triggeredBy: UUID | null;
  triggerSource: string;
  startedAt: Date | null;
  finishedAt: Date | null;
  resultJson: Record<string, unknown>;
  createdAt: Date;
}

export interface ExecutionLog {
  id: number;
  executionId: UUID;
  ts: Date;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  metaJson: Record<string, unknown>;
}

export interface VaultSecret {
  id: UUID;
  orgId: UUID;
  projectId: UUID | null;
  name: string;
  keyVersion: number;
  createdBy: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  id: UUID;
  workflowId: UUID;
  cronExpr: string;
  webhookPath: string | null;
  enabled: boolean;
  lastRunAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
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

export interface PageInput {
  page?: number;
  pageSize?: number;
}
