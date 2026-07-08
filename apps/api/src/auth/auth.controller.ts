import { Controller, Post, Body, UseGuards, Request, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../auth/guards/auth.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("auth")
@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Login with email and password" })
  async login(@Request() req, @Body() body: { email: string; password: string }) {
    const user = await this.auth.validateUser(body.email, body.password);
    return this.auth.login(user);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  async register(@Body() body: { email: string; password: string; name?: string }) {
    return this.auth.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOperation({ summary: "Get current user from JWT" })
  me(@Request() req) {
    return req.user;
  }
}
