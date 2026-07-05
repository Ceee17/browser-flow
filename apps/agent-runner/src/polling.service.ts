import { Injectable, Logger } from "@nestjs/common";
import { RunnerService } from "./runner.service";

@Injectable()
export class PollingService {
  private readonly logger = new Logger(PollingService.name);
  constructor(private readonly runner: RunnerService) {}

  async onModuleInit() {
    this.logger.log("Polling loop initialized");
  }
}
