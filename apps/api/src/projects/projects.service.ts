import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(orgId: string, page: { skip: number; take: number }) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        where: { orgId },
        skip: page.skip,
        take: page.take,
        orderBy: { createdAt: "desc" },
        select: { id: true, orgId: true, name: true, key: true, createdBy: true, createdAt: true, updatedAt: true },
      }),
      this.prisma.project.count({ where: { orgId } }),
    ]);
    return { items, total, page: page.skip / page.take + 1 };
  }

  async get(orgId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, orgId },
      select: { id: true, orgId: true, name: true, key: true, createdBy: true, createdAt: true, updatedAt: true },
    });
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  async create(orgId: string, createdBy: string, data: { name: string; key: string }) {
    try {
      const project = await this.prisma.project.create({
        data: { orgId, createdBy, name: data.name, key: data.key },
        select: { id: true, orgId: true, name: true, key: true, createdBy: true, createdAt: true, updatedAt: true },
      });
      return project;
    } catch (e: any) {
      if (e.code === "P2025") throw new NotFoundException("Org/User not found");
      if (e.code === "P2002") throw new ConflictException("Project key already exists in org");
      throw e;
    }
  }

  async update(orgId: string, id: string, data: { name?: string }) {
    const exists = await this.prisma.project.findFirst({ where: { id, orgId }, select: { id: true } });
    if (!exists) throw new NotFoundException("Project not found");
    const project = await this.prisma.project.update({
      where: { id },
      data: { name: data.name },
      select: { id: true, name: true, key: true, createdAt: true, updatedAt: true },
    });
    return project;
  }

  async remove(orgId: string, id: string) {
    const exists = await this.prisma.project.findFirst({ where: { id, orgId }, select: { id: true } });
    if (!exists) throw new NotFoundException("Project not found");
    await this.prisma.project.delete({ where: { id } });
    return { id };
  }
}
