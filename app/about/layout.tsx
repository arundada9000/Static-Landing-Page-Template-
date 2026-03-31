import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn the story behind ${siteConfig.name}. ${siteConfig.description}`,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
