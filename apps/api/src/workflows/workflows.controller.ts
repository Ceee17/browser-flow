import { Controller, Get, Post, Body, Param, UseGuards, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { WorkflowsService } from "./workflows.service";

@ApiTags("workflows")
@Controller("api/v1")
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private readonly workflows: WorkflowsService) {}

  @Get("projects/:projectId/workflows")
  @ApiParam({ name: "projectId" })
  list(@Param("projectId") projectId: string) {
    return this.workflows.list(projectId);
  }

  @Post("projects/:projectId/workflows")
  @ApiParam({ name: "projectId" })
  create(@Param("projectId") projectId: string, @Req() req: any, @Body() body: { name: string; description?: string; schemaJson: any }) {
    return this.workflows.create(projectId, req.user?.sub || "unknown", body);
  }

  @Get("workflows/:id")
  @ApiParam({ name: "id" })
  get(@Param("id") id: string) {
    return this.workflows.get(id);
  }
}
