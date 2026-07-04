import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
  providers: [PrismaService, ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
