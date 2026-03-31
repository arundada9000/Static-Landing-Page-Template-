import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Get in touch with us for any inquiries, custom orders, or support. We are here to help.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
