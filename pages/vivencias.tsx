import { useEffect } from "react";
import { useRouter } from "next/router";

export default function VivenciasLegacyPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/c/residencias");
  }, [router]);
  return null;
}
