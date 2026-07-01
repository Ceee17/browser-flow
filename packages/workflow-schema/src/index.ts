import {
  z,
  ZodError,
  ZodSchema,
  type ZodTypeAny,
} from "zod";

/**
 * Supported step types in workflow schema v1.
 */
export const StepType = {
  NAVIGATE: "navigate",
  CLICK: "click",
  DBLCLICK: "dblclick",
  HOVER: "hover",
  TYPE: "type",
  PRESS: "press",
  WAIT: "wait",
  SCREENSHOT: "screenshot",
  SCROLL: "scroll",
  UPLOAD: "upload",
  DOWNLOAD: "download",
  EXTRACT_TEXT: "extract-text",
  EXTRACT_TABLE: "extract-table",
  EXECUTE_SCRIPT: "execute-script",
  CONDITION: "condition",
  LOOP: "loop",
  ERROR_BOUNDARY: "error",
} as const;

export type StepType =
  (typeof StepType)[keyof typeof StepType];

/**
 * Multi-strategy selector candidate for a single step.
 */
export const SelectorCandidateSchema = z.object({
  strategy: z.enum(["xpath", "css", "aria", "text", "attr", "position"]),
  value: z.string(),
  confidence: z.number().min(0).max(1),
  specificity: z.number().min(0).max(1).optional(),
  stability: z.number().min(0).max(1).optional(),
  lastVerified: z.coerce.date().optional(),
});

export type SelectorCandidate = z.infer<typeof SelectorCandidateSchema>;

export const SelectorSetSchema = z.object({
  candidates: z.array(SelectorCandidateSchema),
  primaryIndex: z.number().int().nonnegative(),
  fallbackIndices: z.array(z.number().int().nonnegative()).optional(),
});

export type SelectorSet = z.infer<typeof SelectorSetSchema>;

/**
 * Base fields shared across step types.
 */
const StepBaseSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1) as ZodSchema<StepType>,
  selectors: SelectorSetSchema.optional(),
  timeout: z.number().int().positive().optional(),
  retries: z.number().int().nonnegative().optional(),
  retryDelay: z.number().int().nonnegative().optional(),
  onFail: z.enum(["stop", "continue", "branch"]).optional(),
});

/**
 * Action step schemas.
 */
const NavigateStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.NAVIGATE),
  url: z.string().url(),
});

const ClickStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.CLICK),
});

const DblClickStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.DBLCLICK),
});

const HoverStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.HOVER),
});

const TypeStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.TYPE),
  text: z.string(),
  clear: z.boolean().optional(),
});

const PressStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.PRESS),
  key: z.string().min(1),
});

const WaitStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.WAIT),
  duration: z.number().int().positive().optional(),
  selector: z.string().optional(),
  url: z.string().optional(),
});

const ScreenshotStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.SCREENSHOT),
  fullPage: z.boolean().optional(),
  path: z.string().optional(),
});

const ScrollStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.SCROLL),
  direction: z.enum(["down", "up", "left", "right"]).optional(),
  amount: z.number().optional(),
});

const UploadStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.UPLOAD),
  files: z.array(z.string()).min(1),
  selectors: SelectorSetSchema,
});

const DownloadStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.DOWNLOAD),
  saveAs: z.string().optional(),
});

const ExtractTextStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.EXTRACT_TEXT),
  variable: z.string().min(1).optional(),
  multiple: z.boolean().optional(),
});

const ExtractTableStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.EXTRACT_TABLE),
  variable: z.string().min(1).optional(),
});

const ExecuteScriptStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.EXECUTE_SCRIPT),
  script: z.string(),
  args: z.array(z.unknown()).optional(),
});

/**
 * Control flow steps.
 */
const ConditionStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.CONDITION),
  expression: z.string().min(1),
  thenSteps: z.array(z.string()).min(1),
  elseSteps: z.array(z.string()).optional(),
});

const LoopStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.LOOP),
  count: z.number().int().positive().optional(),
  over: z.string().optional(),
  steps: z.array(z.string()).min(1),
});

const ErrorBoundaryStepSchema = StepBaseSchema.extend({
  type: z.literal(StepType.ERROR_BOUNDARY),
  trySteps: z.array(z.string()).min(1),
  catchSteps: z.array(z.string()).optional(),
  finallySteps: z.array(z.string()).optional(),
});

export const StepSchema: ZodSchema<
  z.infer<typeof StepBaseSchema> &
    (
      | z.infer<typeof NavigateStepSchema>
      | z.infer<typeof ClickStepSchema>
      | z.infer<typeof DblClickStepSchema>
      | z.infer<typeof HoverStepSchema>
      | z.infer<typeof TypeStepSchema>
      | z.infer<typeof PressStepSchema>
      | z.infer<typeof WaitStepSchema>
      | z.infer<typeof ScreenshotStepSchema>
      | z.infer<typeof ScrollStepSchema>
      | z.infer<typeof UploadStepSchema>
      | z.infer<typeof DownloadStepSchema>
      | z.infer<typeof ExtractTextStepSchema>
      | z.infer<typeof ExtractTableStepSchema>
      | z.infer<typeof ExecuteScriptStepSchema>
      | z.infer<typeof ConditionStepSchema>
      | z.infer<typeof LoopStepSchema>
      | z.infer<typeof ErrorBoundaryStepSchema>
    )
> = z.discriminatedUnion("type", [
  NavigateStepSchema,
  ClickStepSchema,
  DblClickStepSchema,
  HoverStepSchema,
  TypeStepSchema,
  PressStepSchema,
  WaitStepSchema,
  ScreenshotStepSchema,
  ScrollStepSchema,
  UploadStepSchema,
  DownloadStepSchema,
  ExtractTextStepSchema,
  ExtractTableStepSchema,
  ExecuteScriptStepSchema,
  ConditionStepSchema,
  LoopStepSchema,
  ErrorBoundaryStepSchema,
]);

export type Step = z.infer<typeof StepSchema>;

/**
 * Workflow document schema (v1).
 */
export const WorkflowVariableSchema = z.record(z.string());

export const WorkflowSchema = z.object({
  version: z.literal("1.0"),
  name: z.string().min(1).max(128),
  description: z.string().optional(),
  start: z.string().min(1),
  steps: z.record(StepSchema).refine((obj) => Object.keys(obj).length > 0, {
    message: "Steps must contain at least one entry",
  }),
  variables: WorkflowVariableSchema.optional(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;
export type WorkflowVariable = z.infer<typeof WorkflowVariableSchema>;

/**
 * Validate a workflow JSON object.
 */
export function validateWorkflow(input: unknown): Workflow {
  return WorkflowSchema.parse(input);
}

/**
 * Validate and return errors without throwing.
 */
export function safeValidateWorkflow(input: unknown) {
  const result = WorkflowSchema.safeParse(input);
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  return {
    success: false as const,
    errors: result.error.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    })),
  };
}

export { ZodError };
