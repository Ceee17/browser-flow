import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class RunnerService {
  private readonly logger = new Logger(RunnerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async register(agentId: string, label: string) {
    this.logger.log(`Registering agent ${agentId} (${label})`);
    return this.prisma.agent.upsert({
      where: { id: agentId },
      update: { label, lastHeartbeat: new Date() },
      create: { id: agentId, label, lastHeartbeat: new Date() },
    });
  }

  async heartbeat(agentId: string) {
    return this.prisma.agent.update({
      where: { id: agentId },
      data: { lastHeartbeat: new Date() },
    });
  }
}
