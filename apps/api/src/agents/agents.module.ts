import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";

@Module({
  providers: [PrismaService, AgentsService],
  controllers: [AgentsController],
  exports: [AgentsService],
})
export class AgentsModule {}
