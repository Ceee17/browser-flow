import { IsOptional, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class PageParamsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number;
}

export function getPage(params: PageParamsDto): { skip: number; take: number } {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 20;
  return { skip: (page - 1) * limit, take: limit };
}
