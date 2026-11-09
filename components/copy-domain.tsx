import { CopyLink } from "@/components/copy-link";

export function CopyDomain({ domain }: { domain: string }) {
  return <CopyLink url={`https://${domain}`} label={domain} accessibleLabel={`Copy ${domain} link`} fallbackLabel="Portfolio link" />;
}
