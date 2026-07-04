import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(projectId: string, data: { name: string; platform: string; region: string }) {
    return this.prisma.$executeRawUnsafe(`INSERT INTO "Agent"(id,"projectId",name,platform,region,"lastSeenAt","isActive") VALUES (gen_random_uuid(), $1, $2, $3, $4, now(), true) RETURNING *`, projectId, data.name, data.platform, data.region);
  }
}
