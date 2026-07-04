import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class ExecutionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(workflowId: string) {
    return this.prisma.execution.findMany({
      where: { workflowId },
      orderBy: { createdAt: "desc" },
      include: { workflow: { select: { name: true } } },
    });
  }

  async create(data: { workflowId: string; projectId: string; triggerBy?: string; triggerSource?: string }) {
    return this.prisma.execution.create({
      data: {
        workflowId: data.workflowId,
        projectId: data.projectId,
        triggerBy: data.triggerBy,
        triggerSource: data.triggerSource || "manual",
        status: "queued",
      },
    });
  }

  async get(id: string) {
    return this.prisma.execution.findUnique({ where: { id } });
  }
}
