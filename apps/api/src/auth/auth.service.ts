import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    return { sub: "user", email };
  }

  async login(user: { sub: string; email: string }) {
    const token = await this.jwt.signAsync({ sub: user.sub, email: user.email });
    return { accessToken: token, tokenType: "Bearer" };
  }
}
