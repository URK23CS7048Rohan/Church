"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Globe, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { PrayerCategory } from "@/types";

interface SubmitPrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SubmitPrayerModal({ isOpen, onClose, onSuccess }: SubmitPrayerModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const CATEGORIES: { id: PrayerCategory; labelKey: string }[] = [
    { id: "healing", labelKey: "prayer_cat_healing" },
    { id: "provision", labelKey: "prayer_cat_provision" },
    { id: "guidance", labelKey: "prayer_cat_guidance" },
    { id: "family", labelKey: "prayer_cat_family" },
    { id: "other", labelKey: "prayer_cat_other" },
  ];

  const VISIBILITY = [
    { id: "public", labelKey: "prayer_vis_public", icon: Globe, descKey: "prayer_vis_public_desc" },
    { id: "private", labelKey: "prayer_vis_private", icon: Lock, descKey: "prayer_vis_private_desc" },
    { id: "anonymous", labelKey: "prayer_vis_anonymous", icon: EyeOff, descKey: "prayer_vis_anonymous_desc" },
  ];

  const localSchema = z.object({
    title: z.string().min(5, t("err_title_min")),
    body: z.string().min(20, t("err_body_min")).max(500, t("err_body_max")),
    category: z.enum(["healing", "provision", "guidance", "family", "other"]),
    visibility: z.enum(["public", "private", "anonymous"]),
  });

  type LocalFormData = z.infer<typeof localSchema>;

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<LocalFormData>({
    resolver: zodResolver(localSchema),
    defaultValues: {
      category: "other",
      visibility: "public",
    },
  });

  const bodyValue = watch("body", "");
  const selectedCategory = watch("category");
  const selectedVisibility = watch("visibility");

  const onSubmit = async (data: LocalFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          category: data.category,
          is_public: data.visibility !== "private",
          is_anonymous: data.visibility === "anonymous",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit prayer");

      toast.success(t("prayer_toast_success"));
      reset();
      onSuccess?.();
      onClose();
    } catch {
      toast.error(t("prayer_toast_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[10vh] md:w-full md:max-w-lg z-50 glass-strong rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prayer-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 id="prayer-modal-title" className="font-heading text-xl font-bold text-ivory">
                  {t("prayer_modal_title")}
                </h2>
                <p className="font-body text-fog text-sm mt-0.5">
                  {t("prayer_modal_sub")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-fog hover:text-ivory transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Title */}
              <div>
                <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">
                  {t("prayer_modal_label_title")}
                </label>
                <input
                  {...register("title")}
                  placeholder={t("prayer_modal_placeholder_title")}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors"
                  id="prayer-title"
                />
                {errors.title && <p className="text-ember text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Body */}
              <div>
                <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">
                  {t("prayer_modal_label_body")}
                </label>
                <textarea
                  {...register("body")}
                  rows={5}
                  placeholder={t("prayer_modal_placeholder_body")}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors resize-none"
                  id="prayer-body"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.body ? (
                    <p className="text-ember text-xs">{errors.body.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className={cn("font-label text-xs", bodyValue.length > 480 ? "text-ember" : "text-fog/50")}>
                    {bodyValue.length.toLocaleString()}/500
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">
                  {t("prayer_modal_label_title")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setValue("category", cat.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full font-label text-xs font-semibold border transition-all duration-200",
                        selectedCategory === cat.id
                          ? "bg-sacred text-midnight border-sacred"
                          : "border-white/10 text-fog hover:border-white/20 hover:text-ivory"
                      )}
                      id={`prayer-cat-${cat.id}`}
                    >
                      {t(cat.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">
                  {t("prayer_modal_label_title")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {VISIBILITY.map((v) => (
                    <button
                      type="button"
                      key={v.id}
                      onClick={() => setValue("visibility", v.id as "public" | "private" | "anonymous")}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200",
                        selectedVisibility === v.id
                          ? "border-sacred/50 bg-sacred/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                      id={`prayer-vis-${v.id}`}
                    >
                      <v.icon size={16} className={selectedVisibility === v.id ? "text-sacred" : "text-fog"} />
                      <span className={cn("font-label text-xs font-semibold", selectedVisibility === v.id ? "text-sacred" : "text-fog")}>
                        {t(v.labelKey)}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="font-body text-fog/60 text-xs mt-2 text-start">
                  {t(VISIBILITY.find((v) => v.id === selectedVisibility)?.descKey ?? "")}
                </p>
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" id="prayer-submit-btn">
                {t("prayer_modal_btn_submit")}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
