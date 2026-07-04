import {
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, Query, ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ProjectsService } from "./projects.service";
import { PageParamsDto } from "../common/dto/page-params.dto";

@ApiTags("projects")
@Controller("api/v1/projects")
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: "List projects in org" })
  list(@Req() req: any, @Query() query: PageParamsDto) {
    const orgId = req.user?.orgId || req.user?.sub;
    const page = {
      skip: (Number(query.page) || 1 - 1) * (Number(query.limit) || 20),
      take: Number(query.limit) || 20,
    };
    return this.projects.list(orgId, page);
  }

  @Get(":id")
  @ApiParam({ name: "id" })
  get(@Param("id") id: string, @Req() req: any) {
    return this.projects.get(req.user?.orgId || req.user?.sub, id);
  }

  @Post()
  @ApiOperation({ summary: "Create project" })
  create(@Req() req: any, @Body() body: { name: string; key: string }) {
    return this.projects.create(req.user?.orgId || req.user?.sub, req.user?.sub, body);
  }

  @Patch(":id")
  @ApiParam({ name: "id" })
  update(@Param("id") id: string, @Req() req: any, @Body() body: { name: string }) {
    return this.projects.update(req.user?.orgId || req.user?.sub, id, body);
  }

  @Delete(":id")
  @ApiParam({ name: "id" })
  remove(@Param("id") id: string, @Req() req: any) {
    return this.projects.remove(req.user?.orgId || req.user?.sub, id);
  }
}
