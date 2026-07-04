import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";
import { ExecutionsController } from "./executions.controller";
import { ExecutionsService } from "./executions.service";

@Module({
  providers: [PrismaService, ExecutionsService],
  controllers: [ExecutionsController],
  exports: [ExecutionsService],
})
export class ExecutionsModule {}
