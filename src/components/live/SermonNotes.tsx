"use client";

import { useState, useEffect } from "react";
import { FileText, Save, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface SermonNotesProps {
  sermonId: string;
}

export function SermonNotes({ sermonId }: SermonNotesProps) {
  const { t } = useLanguage();
  const storageKey = `sanctuary-notes-${sermonId}`;
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setNotes(saved);
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    if (confirm(t("live_notes_confirm_clear"))) {
      setNotes("");
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-sacred" />
          <span className="font-label text-sm font-semibold text-ivory">{t("live_sermon_notes")}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-label font-semibold text-fog hover:text-ivory hover:bg-white/5 transition-colors"
            id="save-notes-btn"
          >
            <Save size={12} />
            {saved ? t("live_notes_saved") : t("live_notes_save")}
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-fog/50 hover:text-ember transition-colors"
            aria-label="Clear notes"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={t("live_notes_placeholder")}
        className="flex-1 bg-transparent text-ivory font-body text-sm leading-relaxed p-4 resize-none focus:outline-none placeholder:text-fog/30"
        id={`sermon-notes-${sermonId}`}
      />
      <div className="px-4 py-2 border-t border-white/5">
        <p className="font-body text-fog/40 text-xs">
          {notes.length > 0
            ? `${notes.split(/\s+/).filter(Boolean).length} ${t("live_notes_word_count")}`
            : t("live_notes_auto_save")}
        </p>
      </div>
    </div>
  );
}
