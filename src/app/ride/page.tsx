"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Car, Users, Navigation, Clock, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { RideOffer } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const MOCK_OFFERS: RideOffer[] = [
  { id: "1", driver_id: "u1", pickup_address: "123 Oak Street, Brooklyn", pickup_lat: 40.6501, pickup_lng: -73.9496, service_time: "2026-06-21T09:00:00Z", seats_available: 3, seats_remaining: 2, notes: "Happy to pick up along the route!", status: "open", created_at: "", distance_km: 1.2, driver: { full_name: "Marcus Thompson", avatar_url: null, phone: null } },
  { id: "2", driver_id: "u2", pickup_address: "45 Maple Ave, Queens", pickup_lat: 40.7282, pickup_lng: -73.7949, service_time: "2026-06-21T09:00:00Z", seats_available: 4, seats_remaining: 3, notes: "Leaving at 8:15 AM sharp.", status: "open", created_at: "", distance_km: 2.8, driver: { full_name: "Sarah Okafor", avatar_url: null, phone: null } },
  { id: "3", driver_id: "u3", pickup_address: "89 Church Road, Manhattan", pickup_lat: 40.7614, pickup_lng: -73.9776, service_time: "2026-06-21T11:00:00Z", seats_available: 2, seats_remaining: 1, notes: "11 AM service only. Air-conditioned car.", status: "open", created_at: "", distance_km: 0.7, driver: { full_name: "James Rivera", avatar_url: null, phone: null } },
];

const SERVICES = [
  { id: "sun-9", labelKey: "ride_service_sun_9", defaultLabel: "Sunday 9:00 AM" },
  { id: "sun-11", labelKey: "ride_service_sun_11", defaultLabel: "Sunday 11:00 AM" },
  { id: "wed-7", labelKey: "ride_service_wed_7", defaultLabel: "Wednesday 7:00 PM" },
];

const offerSchema = z.object({
  pickup_address: z.string().min(5, "Address required"),
  service: z.string().min(1, "Select a service"),
  seats: z.number().min(1).max(6),
  notes: z.string().optional(),
});

const requestSchema = z.object({
  pickup_address: z.string().min(5, "Address required"),
  service: z.string().min(1, "Select a service"),
});

type OfferForm = z.infer<typeof offerSchema>;
type RequestForm = z.infer<typeof requestSchema>;

type Tab = "offer" | "request" | "matches";

function RidePageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("request") === "true" ? "request" : "request";
  
  const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
  const [searchResults, setSearchResults] = useState<RideOffer[]>([]);
  const [matchedRide, setMatchedRide] = useState<RideOffer | null>(null);
  const [loading, setLoading] = useState(false);

  const offerForm = useForm<OfferForm>({ resolver: zodResolver(offerSchema), defaultValues: { seats: 2 } });
  const requestForm = useForm<RequestForm>({ resolver: zodResolver(requestSchema) });

  const onOfferSubmit = async (data: OfferForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Ride offer posted! Others can now request a ride from you. 🚗");
    offerForm.reset();
    setLoading(false);
  };

  const onRequestSubmit = async (data: RequestForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSearchResults(MOCK_OFFERS.filter((o) => {
      if (data.service === "sun-9") return o.service_time.includes("09:00");
      if (data.service === "sun-11") return o.service_time.includes("11:00");
      return true;
    }));
    setLoading(false);
  };

  const handleRequestRide = async (offer: RideOffer) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setMatchedRide(offer);
    setActiveTab("matches");
    toast.success("Ride request sent! The driver will confirm shortly.");
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 lg:pb-0">
        {/* Hero */}
        <div className="relative pt-32 pb-12 px-4 overflow-hidden text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% -5%, rgba(201,168,76,0.1) 0%, transparent 65%)" }} />
          <div className="max-w-2xl mx-auto relative z-10">
            <RevealOnScroll><span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">{t("ride_eyebrow")}</span></RevealOnScroll>
            <RevealOnScroll delay={0.1}><h1 className="font-display text-6xl font-bold text-ivory mt-4 mb-3">{t("ride_headline")}<span className="gold-text">{t("ride_headline_highlight")}</span></h1></RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-fog text-xl mb-3">{t("ride_subtitle")}</p>
              <p className="font-body text-fog italic text-sm max-w-lg mx-auto">
                "{t("ride_scripture")}"
              </p>
              <p className="font-accent text-[10px] text-sacred/70 tracking-widest mt-1">
                {t("ride_scripture_ref")}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-20">
          {/* Tabs */}
          <div className="flex gap-1 p-1 glass rounded-2xl mb-8 max-w-sm">
            {(["request", "offer", "matches"] as Tab[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-2.5 rounded-xl font-label text-sm font-semibold transition-all duration-200 capitalize", activeTab === tab ? "bg-sacred text-midnight" : "text-fog hover:text-ivory")} id={`ride-tab-${tab}`}>
                {tab === "matches" ? t("ride_tab_matches") : tab === "offer" ? t("ride_tab_offer") : t("ride_tab_request")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "request" && (
              <motion.div key="request" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid lg:grid-cols-2 gap-8">
                {/* Search form */}
                <GlassCard>
                  <h2 className="font-heading text-xl font-bold text-ivory mb-6">{t("ride_find_title")}</h2>
                  <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_address")}</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fog/50" />
                        <input {...requestForm.register("pickup_address")} placeholder={t("ride_placeholder_address")} className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="request-address" />
                      </div>
                    </div>
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_service")}</label>
                      <div className="space-y-2">
                        {SERVICES.map((s) => (
                          <label key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer hover:border-sacred/30 transition-colors has-[:checked]:border-sacred/50 has-[:checked]:bg-sacred/5">
                            <input {...requestForm.register("service")} type="radio" value={s.id} className="accent-sacred" id={`service-${s.id}`} />
                            <span className="font-body text-ivory text-sm">{t(s.labelKey) || s.defaultLabel}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" variant="primary" className="w-full" loading={loading} icon={<Navigation size={16} />} id="find-rides-btn">{t("ride_btn_find")}</Button>
                  </form>
                </GlassCard>

                {/* Results */}
                <div>
                  {searchResults.length > 0 ? (
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ivory mb-4">{searchResults.length} {t("ride_no_rides")}</h3>
                      <div className="space-y-4">
                        {searchResults.map((offer) => (
                          <RideOfferCard key={offer.id} offer={offer} onRequest={handleRequestRide} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center gap-3">
                      <Car size={40} className="text-fog/30" />
                      <p className="font-body text-fog">{t("ride_empty_prompt")}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "offer" && (
              <motion.div key="offer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-lg">
                <GlassCard>
                  <h2 className="font-heading text-xl font-bold text-ivory mb-2">{t("ride_offer_title")}</h2>
                  <p className="font-body text-fog text-sm mb-6">{t("ride_offer_subtitle")}</p>
                  <form onSubmit={offerForm.handleSubmit(onOfferSubmit)} className="space-y-5">
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_pickup_loc")}</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fog/50" />
                        <input {...offerForm.register("pickup_address")} placeholder={t("ride_placeholder_offer_address")} className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="offer-address" />
                      </div>
                    </div>
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_service")}</label>
                      <div className="space-y-2">
                        {SERVICES.map((s) => (
                          <label key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer hover:border-sacred/30 transition-colors has-[:checked]:border-sacred/50 has-[:checked]:bg-sacred/5">
                            <input {...offerForm.register("service")} type="radio" value={s.id} className="accent-sacred" id={`offer-service-${s.id}`} />
                            <span className="font-body text-ivory text-sm">{t(s.labelKey) || s.defaultLabel}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_seats")}</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <button type="button" key={n} onClick={() => offerForm.setValue("seats", n)} className={cn("w-10 h-10 rounded-xl font-label font-semibold text-sm border transition-all", offerForm.watch("seats") === n ? "border-sacred bg-sacred/15 text-sacred" : "border-white/10 text-fog hover:text-ivory")} id={`seats-${n}`}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">{t("ride_label_notes")}</label>
                      <textarea {...offerForm.register("notes")} rows={3} placeholder={t("ride_placeholder_notes")} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors resize-none" id="offer-notes" />
                    </div>
                    <Button type="submit" variant="primary" className="w-full" loading={loading} icon={<Car size={16} />} id="post-ride-btn">{t("ride_btn_post")}</Button>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "matches" && (
              <motion.div key="matches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {matchedRide ? (
                  <GlassCard className="max-w-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ivory">{t("ride_confirmed_title")}</h3>
                        <p className="font-body text-fog text-sm">{t("ride_confirmed_sub")}</p>
                      </div>
                    </div>
                    <div className="glass rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center text-ivory font-label font-semibold">
                          {matchedRide.driver?.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-label font-semibold text-ivory">{matchedRide.driver?.full_name}</p>
                          <p className="font-body text-fog text-xs">{t("ride_your_driver")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={14} className="text-sacred mt-0.5 shrink-0" />
                        <p className="font-body text-fog">{matchedRide.pickup_address}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={14} className="text-sacred" />
                        <p className="font-body text-fog">{matchedRide.seats_remaining} {t("ride_seats_remaining")}</p>
                      </div>
                      {matchedRide.notes && (
                        <div className="bg-surface-2 rounded-lg p-3">
                          <p className="font-body text-fog text-sm italic">"{matchedRide.notes}"</p>
                        </div>
                      )}
                    </div>
                    <p className="font-body text-fog/60 text-xs mt-4">
                      {t("ride_contact_note")}
                    </p>
                  </GlassCard>
                ) : (
                  <div className="text-center py-20">
                    <Car size={48} className="text-fog/30 mx-auto mb-4" />
                    <p className="font-body text-fog text-lg">{t("ride_no_matches")}</p>
                    <button onClick={() => setActiveTab("request")} className="font-body text-sm text-sacred hover:text-sacred-light transition-colors mt-3">
                      {t("ride_btn_request_ride")}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

interface RideOfferCardProps {
  offer: RideOffer;
  onRequest: (o: RideOffer) => void;
}

function RideOfferCard({ offer, onRequest }: RideOfferCardProps) {
  const { t } = useLanguage();
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-surface-3 flex items-center justify-center font-label font-semibold text-ivory shrink-0">
            {offer.driver?.full_name.charAt(0)}
          </div>
          <div>
            <p className="font-label font-semibold text-ivory">{offer.driver?.full_name}</p>
            {offer.distance_km && <p className="font-body text-fog/60 text-xs">{offer.distance_km.toFixed(1)} {t("ride_km_away")}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sacred">
          <Users size={14} />
          <span className="font-label text-sm font-semibold">{offer.seats_remaining} {t("ride_seats_left")}</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <MapPin size={14} className="text-sacred mt-0.5 shrink-0" />
          <p className="font-body text-fog">{offer.pickup_address}</p>
        </div>
        {offer.notes && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-sacred mt-0.5">💬</span>
            <p className="font-body text-fog/70 italic">"{offer.notes}"</p>
          </div>
        )}
      </div>
      <Button variant="primary" size="sm" className="mt-4 w-full" onClick={() => onRequest(offer)} id={`request-ride-${offer.id}`}>
        {t("ride_btn_request")}
      </Button>
    </motion.div>
  );
}

export default function RidePage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sacred border-t-transparent animate-spin" />
        <p className="font-label text-sm text-fog">{t("ride_loading")}</p>
      </div>
    }>
      <RidePageContent />
    </Suspense>
  );
}
