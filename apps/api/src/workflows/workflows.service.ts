import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(projectId: string) {
    return this.prisma.workflow.findMany({
      where: { projectId },
      include: { project: { select: { name: true, key: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async get(id: string) {
    const workflow = await this.prisma.workflow.findUnique({ where: { id } });
    if (!workflow) throw new NotFoundException("Workflow not found");
    return workflow;
  }

  async create(projectId: string, createdBy: string, data: { name: string; description?: string; schemaJson: any }) {
    return this.prisma.workflow.create({
      data: {
        projectId,
        createdBy,
        name: data.name,
        description: data.description,
        schemaJson: data.schemaJson,
        stepsCount: Array.isArray(data.schemaJson?.steps) ? data.schemaJson.steps.length : 0,
      },
      include: { project: { select: { name: true, key: true } } },
    });
  }
}
