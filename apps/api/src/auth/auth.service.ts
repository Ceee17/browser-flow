import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../config/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return { sub: user.id, email: user.email, name: user.name };
  }

  async login(user: { sub: string; email: string; name?: string }) {
    const payload = { sub: user.sub, email: user.email, name: user.name };
    const token = await this.jwt.signAsync(payload);
    return { accessToken: token, tokenType: "Bearer" };
  }

  async register(data: { email: string; password: string; name?: string }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, name: user.name });
    return { accessToken: token, tokenType: "Bearer", user };
  }
}
