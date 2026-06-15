"use client";

import { motion } from "framer-motion";
import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { ChevronLeft, CarFront, MapPin, Clock, Phone, Navigation } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function NativeRide() {
  const { t } = useLanguage();

  return (
    <NativePageWrapper title="Ride Help">
      <div className="min-h-screen bg-[#F0EDE8] text-[#111] flex flex-col font-body">
        
        {/* Header */}
        <header className="px-5 pt-14 pb-6 sticky top-0 z-20 bg-[rgba(240,237,232,0.9)] backdrop-blur-xl border-b border-black/5">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 active:scale-90 transition-transform">
              <Phone size={18} />
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-oswald)", fontSize: "36px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            NEED A<br/>RIDE?
          </h1>
        </header>

        <div className="flex-1 px-5 pt-4 pb-20">
          
          <div className="mb-6 relative overflow-hidden rounded-[24px] p-6 text-white" style={{ background: "linear-gradient(135deg, #1A2E20, #0F1E15)" }}>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <CarFront size={120} />
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Church Van Service</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", lineHeight: 1.5, color: "rgba(255,255,255,0.8)" }}>
              We provide free transportation to and from all Friday services and Wednesday prayer meetings.
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#1A2E20]/10 flex items-center justify-center text-[#1A2E20]">
                <MapPin size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 600 }}>Pickup Locations</h3>
                <p style={{ fontFamily: "var(--font-lato)", fontSize: "12px", color: "#666" }}>Downtown, Westside, Campus</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#1A2E20]/10 flex items-center justify-center text-[#1A2E20]">
                <Clock size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 600 }}>Schedule</h3>
                <p style={{ fontFamily: "var(--font-lato)", fontSize: "12px", color: "#666" }}>Runs 45 mins before service</p>
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Request a Ride</h3>
          
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white border border-black/5 outline-none focus:border-[#1A2E20] transition-colors" />
            <input type="text" placeholder="Pickup Address" className="w-full p-4 rounded-xl bg-white border border-black/5 outline-none focus:border-[#1A2E20] transition-colors" />
            <select className="w-full p-4 rounded-xl bg-white border border-black/5 outline-none focus:border-[#1A2E20] transition-colors">
              <option value="">Select Service</option>
              <option value="friday_9am">Friday 9:00 AM</option>
              <option value="friday_11am">Friday 11:00 AM</option>
              <option value="wednesday">Wednesday 7:00 PM</option>
            </select>
            <button type="button" className="w-full py-4 rounded-xl text-white font-bold tracking-wide mt-2 flex justify-center items-center gap-2 active:scale-[0.98] transition-transform" style={{ background: "linear-gradient(135deg, #C9A84C, #9A7A30)" }}>
              <Navigation size={18} />
              REQUEST RIDE
            </button>
          </form>

        </div>
      </div>
    </NativePageWrapper>
  );
}
