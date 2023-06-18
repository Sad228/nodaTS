import * as jwt from "jsonwebtoken";

import { ITokensPair } from "../types/token.tipes";

class TokenService {
  public generateTokenPair(
    payload: Record<string, string | number>
  ): ITokensPair {
    const accessToken = jwt.sign(payload, "jwtAccess", { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, "jwtRefresh", { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
