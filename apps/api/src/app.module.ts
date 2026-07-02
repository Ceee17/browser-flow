import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthController } from "./common/health.controller";
import { ConfigModule as AppConfigModule } from "./config/config.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AppConfigModule, AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
