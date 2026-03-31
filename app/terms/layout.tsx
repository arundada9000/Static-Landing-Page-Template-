import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms and conditions of use for ${siteConfig.name}`,
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
