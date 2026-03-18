const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

export function isValidEmail(value) {
  return typeof value === "string" && emailPattern.test(value.trim());
}

export function isValidUUID(value) {
  return typeof value === "string" && uuidPattern.test(value.trim());
}

export function sanitizeOptionalString(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? null : trimmedValue;
}
