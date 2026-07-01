import { z } from "zod";

export type TriggerType = "manual" | "cron" | "webhook" | "api";

export const TriggerSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("manual"),
  }),
  z.object({
    type: z.literal("cron"),
    cron: z.string().min(1),
    timezone: z.string().optional(),
  }),
  z.object({
    type: z.literal("webhook"),
    path: z.string().min(1),
    secret: z.string().optional(),
  }),
  z.object({
    type : z.literal("api"),
  }),
]);

export type Trigger = z.infer<typeof TriggerSchema>;

export interface Schedule {
  id: string;
  workflowId: string;
  trigger: Trigger;
  enabled: boolean;
  createdAt: Date;
}
