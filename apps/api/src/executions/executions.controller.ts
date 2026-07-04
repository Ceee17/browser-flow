import { Controller, Get, Post, Body, Param, UseGuards, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ExecutionsService } from "./executions.service";

@ApiTags("executions")
@Controller("api/v1")
@UseGuards(JwtAuthGuard)
export class ExecutionsController {
  constructor(private readonly executions: ExecutionsService) {}

  @Get("workflows/:workflowId/executions")
  @ApiParam({ name: "workflowId" })
  list(@Param("workflowId") workflowId: string) {
    return this.executions.list(workflowId);
  }

  @Post("workflows/:workflowId/executions")
  @ApiParam({ name: "workflowId" })
  create(@Param("workflowId") workflowId: string, @Body() body: { projectId: string; triggerBy?: string }) {
    return this.executions.create({
      workflowId,
      projectId: body.projectId,
      triggerBy: body.triggerBy,
      triggerSource: "manual",
    });
  }

  @Get("executions/:id")
  @ApiParam({ name: "id" })
  get(@Param("id") id: string) {
    return this.executions.get(id);
  }
}
