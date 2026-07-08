import type { TenantType } from "@/lib/modules";

export interface VesperaUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  tenantSlug: string;
  tenantType: TenantType;
  subscriptionType: number;
}

export interface VesperaSession {
  user: VesperaUser;
  expires: string;
}
