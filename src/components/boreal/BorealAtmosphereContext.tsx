"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import {
  AURORA_PRESET_STRENGTH,
  DEFAULT_AURORA_TINT,
  getAuroraPreset,
  type AuroraIntensity,
  type RgbColor,
  type SnowMode,
} from "@/components/boreal/types";

export { DEFAULT_AURORA_TINT };

const AURORA_CYCLE: AuroraIntensity[] = ["quiet", "balanced", "vivid"];

interface BorealAtmosphereContextValue {
  auroraStrength: number;
  setAuroraStrength: (value: number) => void;
  auroraStrengthRef: MutableRefObject<number>;
  aurora: AuroraIntensity;
  cycleAurora: () => void;
  snow: SnowMode;
  toggleSnow: () => void;
  stoked: boolean;
  toggleStoked: () => void;
  auroraTintRef: MutableRefObject<RgbColor>;
  setAuroraTint: (rgb: RgbColor | null, owner?: string) => void;
  stokedRef: MutableRefObject<boolean>;
}

const BorealAtmosphereContext =
  createContext<BorealAtmosphereContextValue | null>(null);

export function BorealAtmosphereProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auroraStrength, setAuroraStrengthState] = useState<number>(60);
  const [snow, setSnow] = useState<SnowMode>("flurry");
  const [stoked, setStoked] = useState(false);

  const auroraStrengthRef = useRef<number>(60);
  const auroraTintRef = useRef<RgbColor>([...DEFAULT_AURORA_TINT]);
  const tintOwnerRef = useRef<string | null>(null);
  const stokedRef = useRef(false);

  useEffect(() => {
    auroraStrengthRef.current = auroraStrength;
  }, [auroraStrength]);

  useEffect(() => {
    stokedRef.current = stoked;
  }, [stoked]);

  const setAuroraStrength = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    auroraStrengthRef.current = clamped;
    setAuroraStrengthState(clamped);
  }, []);

  const cycleAurora = useCallback(() => {
    setAuroraStrengthState((prev) => {
      const currentPreset = getAuroraPreset(prev);
      const idx = AURORA_CYCLE.indexOf(currentPreset);
      const nextPreset = AURORA_CYCLE[(idx + 1) % AURORA_CYCLE.length];
      const nextStrength = AURORA_PRESET_STRENGTH[nextPreset];
      auroraStrengthRef.current = nextStrength;
      return nextStrength;
    });
  }, []);

  const toggleSnow = useCallback(() => {
    setSnow((prev) => (prev === "flurry" ? "still" : "flurry"));
  }, []);

  const toggleStoked = useCallback(() => {
    setStoked((prev) => {
      const next = !prev;
      stokedRef.current = next;
      return next;
    });
  }, []);

  const setAuroraTint = useCallback((rgb: RgbColor | null, owner?: string) => {
    if (rgb === null) {
      // Prevent an unmounting card from clearing a page-owned tint.
      if (owner && tintOwnerRef.current && tintOwnerRef.current !== owner) {
        return;
      }
      auroraTintRef.current = [...DEFAULT_AURORA_TINT];
      tintOwnerRef.current = null;
      return;
    }

    auroraTintRef.current = [rgb[0], rgb[1], rgb[2]];
    tintOwnerRef.current = owner ?? null;
  }, []);

  const aurora = getAuroraPreset(auroraStrength);

  const value = useMemo<BorealAtmosphereContextValue>(
    () => ({
      auroraStrength,
      setAuroraStrength,
      auroraStrengthRef,
      aurora,
      cycleAurora,
      snow,
      toggleSnow,
      stoked,
      toggleStoked,
      auroraTintRef,
      setAuroraTint,
      stokedRef,
    }),
    [
      auroraStrength,
      setAuroraStrength,
      aurora,
      cycleAurora,
      snow,
      toggleSnow,
      stoked,
      toggleStoked,
      setAuroraTint,
    ],
  );

  return (
    <BorealAtmosphereContext.Provider value={value}>
      {children}
    </BorealAtmosphereContext.Provider>
  );
}

export function useBorealAtmosphere() {
  const ctx = useContext(BorealAtmosphereContext);
  if (!ctx) {
    throw new Error(
      "useBorealAtmosphere must be used inside BorealAtmosphereProvider",
    );
  }
  return ctx;
}
