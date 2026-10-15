import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/lib/i18n";

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { path } = useLanguage();
  return <Link {...props} href={typeof href === "string" ? path(href) : href} />;
}
