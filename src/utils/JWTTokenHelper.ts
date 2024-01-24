import { JWTPayload, SignJWT, jwtVerify } from "jose";

interface TokenPayload {
  email: string;
  id: string;
  name: string; // Assuming you have name in the payload
}

export async function CreateToken(
  email: string,
  id: string,
  name: string
): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ email, id, name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER?.toString() || "")
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME?.toString() || "")
    .sign(secret);

  return token;
}

export async function VerifyToken(token: string): Promise<TokenPayload> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return mapJWTPayloadToTokenPayload(decoded.payload);
}

function mapJWTPayloadToTokenPayload(jwtPayload: JWTPayload): TokenPayload {
  // Perform explicit mapping
  return {
    email: jwtPayload.email as string,
    id: jwtPayload.id as string,
    name: jwtPayload.name as string,
  };
}
