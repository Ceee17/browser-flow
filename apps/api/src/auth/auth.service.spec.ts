import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "../config/prisma.service";

describe("AuthService", () => {
  let service: AuthService;
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
