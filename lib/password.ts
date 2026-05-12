import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function createPasswordHash(password: string) {
  return hashPassword(password);
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const derived = scryptSync(password, salt, 64);
  const buffer = Buffer.from(key, "hex");

  return buffer.length === derived.length && timingSafeEqual(buffer, derived);
}
