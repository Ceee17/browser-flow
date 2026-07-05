import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(projectId: string, data: { name: string; platform: string; region: string }) {
    return this.prisma.agent.create({
      data: {
        projectId,
        name: data.name,
        platform: data.platform,
        region: data.region,
      },
    });
  }
}
