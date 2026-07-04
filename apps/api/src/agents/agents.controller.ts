import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AgentsService } from "./agents.service";

@ApiTags("agents")
@Controller("api/v1")
@UseGuards(JwtAuthGuard)
export class AgentsController {
  constructor(private readonly agents: AgentsService) {}

  @Post("agents/register")
  @ApiOperation({ summary: "Register agent for project" })
  register(@Body() body: { projectId: string; name: string; platform: string; region: string }) {
    return this.agents.register(body.projectId, body);
  }
}
