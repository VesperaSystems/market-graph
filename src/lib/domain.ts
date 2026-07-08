export const COMPANY_HOST = "vesperasystems.com";
export const PRODUCT_HOST = "vespera.systems";
export const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export function normalizeHost(host: string | null) {
  return (host || "").split(":")[0].toLowerCase();
}

export function isCompanyHost(host: string | null) {
  return normalizeHost(host).endsWith(COMPANY_HOST);
}

export function isProductHost(host: string | null) {
  const normalized = normalizeHost(host);
  return normalized.endsWith(PRODUCT_HOST) || LOCAL_HOSTS.has(normalized);
}
