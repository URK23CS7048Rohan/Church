"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Heart } from "lucide-react";

// Mosaic layout with varied sizes
const MOCK_PHOTOS = [
  { id: "1", src: "/church-photos/main-prayer.jpeg", caption: "Blessed time of prayer and intercession", hearts: 94, tall: true },
  { id: "2", src: "/church-photos/church-photo-1.jpeg", caption: "Congregational Worship", hearts: 88 },
  { id: "3", src: "/church-photos/church-photo-2.jpeg", caption: "Our Sanctuary", hearts: 72 },
  { id: "4", src: "/church-photos/church-photo-3.jpeg", caption: "Praise & Worship Team", hearts: 82, tall: true },
  { id: "5", src: "/church-photos/church-photo-4.jpeg", caption: "Weekly Home Fellowships", hearts: 65 },
  { id: "6", src: "/church-photos/church-photo-5.jpeg", caption: "Friday Service Assembly", hearts: 99 },
];

export function PhotoMosaic() {
  return (
    <section className="py-20 px-4 bg-surface-1/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="This Friday"
            title="The Family You"
            titleHighlight="Love"
            align="left"
          />
          <RevealOnScroll direction="left">
            <Link
              href="/community"
              className="font-body text-sm text-sacred hover:text-sacred-light transition-colors hidden sm:block"
            >
              View all photos →
            </Link>
          </RevealOnScroll>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 auto-rows-[180px]">
          {MOCK_PHOTOS.map((photo, i) => (
            <RevealOnScroll key={photo.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative group overflow-hidden rounded-2xl bg-surface-2 cursor-pointer ${
                  photo.tall ? "row-span-2" : ""
                }`}
                style={{ height: photo.tall ? "372px" : "180px" }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="font-body text-ivory text-sm font-medium mb-1">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-1.5 text-sacred text-xs">
                    <Heart size={12} className="fill-sacred" />
                    <span>{photo.hearts}</span>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/community" className="font-body text-sm text-sacred">
            View all photos →
          </Link>
        </div>
      </div>
    </section>
  );
}
