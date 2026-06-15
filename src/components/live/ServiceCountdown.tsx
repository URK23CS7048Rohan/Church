"use client";

import { useState, useEffect } from "react";
import { calculateCountdown, getNextSunday } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ServiceCountdown() {
  const { t } = useLanguage();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => setTime(calculateCountdown(getNextSunday()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { labelKey: "live_countdown_days", defaultLabel: "DAYS", value: time.days },
    { labelKey: "live_countdown_hrs", defaultLabel: "HRS", value: time.hours },
    { labelKey: "live_countdown_min", defaultLabel: "MIN", value: time.minutes },
    { labelKey: "live_countdown_sec", defaultLabel: "SEC", value: time.seconds },
  ];

  return (
    <div className="glass rounded-2xl p-8 text-center">
      <p className="font-accent text-xs text-sacred tracking-widest uppercase mb-6">
        {t("live_countdown_begins")}
      </p>
      <div className="flex items-center justify-center gap-4">
        {units.map(({ labelKey, defaultLabel, value }, i) => (
          <div key={labelKey} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="glass rounded-xl px-5 py-4 min-w-[72px]">
                <span className="font-label font-bold text-sacred text-4xl tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-accent text-[10px] text-fog/60 tracking-widest mt-2">
                {t(labelKey) || defaultLabel}
              </span>
            </div>
            {i < 3 && (
              <span className="font-label font-bold text-sacred/30 text-3xl mb-5">:</span>
            )}
          </div>
        ))}
      </div>
      <p className="font-body text-fog/70 text-sm mt-6">
        {t("live_countdown_schedule")}
      </p>
    </div>
  );
}
