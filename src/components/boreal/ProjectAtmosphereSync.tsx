"use client";

import { useEffect } from "react";
import { useBorealAtmosphere } from "@/components/boreal/BorealAtmosphereContext";
import { getProjectAuroraTint } from "@/components/boreal/types";

export function ProjectAtmosphereSync({ slug }: { slug: string }) {
  const { setAuroraTint } = useBorealAtmosphere();

  useEffect(() => {
    setAuroraTint(getProjectAuroraTint(slug), "page");
    return () => {
      setAuroraTint(null, "page");
    };
  }, [slug, setAuroraTint]);

  return null;
}
