"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Heart } from "lucide-react";

// Mosaic layout with varied sizes
const MOCK_PHOTOS = [
  { id: "1", src: "https://images.unsplash.com/photo-1438232992991-995b671e8640?w=400&q=70", caption: "Sunday worship", hearts: 34, tall: true },
  { id: "2", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=70", caption: "Community time", hearts: 18 },
  { id: "3", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70", caption: "Prayer circle", hearts: 27 },
  { id: "4", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=70", caption: "Youth group", hearts: 42, tall: true },
  { id: "5", src: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&q=70", caption: "Worship night", hearts: 55 },
  { id: "6", src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=70", caption: "Baptism Sunday", hearts: 89 },
];

export function PhotoMosaic() {
  return (
    <section className="py-20 px-4 bg-surface-1/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="This Sunday"
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
