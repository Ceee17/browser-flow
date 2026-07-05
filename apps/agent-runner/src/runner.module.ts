import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RunnerService } from "./runner.service";
import { PollingService } from "./polling.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [RunnerService, PollingService],
})
export class RunnerModule {}
