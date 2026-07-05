import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RunnerModule } from "./runner.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RunnerModule,
    {
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL ?? "redis://localhost:6379",
        queue: "browserflow.runner",
      },
    }
  );
  await app.listen();
  console.log("Agent runner listening on Redis queue: browserflow.runner");
}
bootstrap();
