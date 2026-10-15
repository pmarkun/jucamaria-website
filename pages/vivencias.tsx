import { useEffect } from "react";
import { useRouter } from "next/router";
import { localizedPath, languageFromPath } from "@/lib/i18n";

export default function VivenciasLegacyPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(localizedPath("/c/residencias", languageFromPath(router.asPath)));
  }, [router]);
  return null;
}
