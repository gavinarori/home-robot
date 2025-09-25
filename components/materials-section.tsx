"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const materials = [
  {
    id: "assist",
    name: "Assistance",
    description: "Tidying, dish loading, laundry sorting, light meal prep, and daily routines.",
    image: "/cap-assist.png",
    backgroundImage:
      "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F7b20cd40f136e6fc1fe5704c85a52466526d8d48-4320x2640.webp%3Fw%3D4320%26fit%3Dmax%26auto%3Dformat&w=3840&q=100",
    tint: "bg-green-50",
  },
  {
    id: "safety",
    name: "Safety",
    description: "Fall detection, room awareness, protective motion planning, and privacy by design.",
    image: "/cap-safety.png",
    backgroundImage:
      "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F5988401dfa550a1bbf7ca4d4cf70cc8870cca309-3024x1883.webp%3Fq%3D100%26fit%3Dmax%26auto%3Dformat&w=3840&q=75",
    tint: "bg-gray-100",
  },
  {
    id: "presence",
    name: "Presence",
    description: "Natural voice, gentle gestures, attentive eye contact, and context memory.",
    image: "/cap-presence.png",
    backgroundImage:
      "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F8be5132be8484a5a8278d842dd271e5a81eb6813-4320x2640.webp%3Fw%3D4320%26fit%3Dmax%26auto%3Dformat&w=3840&q=100",
    tint: "bg-red-50",
  },
]

export function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("pistachio")

  const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="materials">
      <div className="absolute inset-0 z-0">
        {materials.map((material) => (
          <motion.div
            key={material.id}
            className="absolute inset-0"
            initial={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            animate={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={material.backgroundImage || "/placeholder.svg"}
              alt={`${material.name} interior scene`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute top-[120px] left-0 right-0 z-10">
        <div className="container-custom text-white">
          <Reveal>
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeMaterial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold mb-6 text-7xl"
                >
                  <AnimatedText text={activeMaterialData.name} delay={0.2} />
                </motion.h2>
              </AnimatePresence>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                Homu blends dexterous hands, safe mobility, and intuitive conversation to help at home. Explore key
                capabilities that make everyday life a little easier and a lot more delightful.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-10 max-w-md hidden">
        <Reveal delay={0.3}>
          <blockquote className="pl-0 py-4">
            <p className="text-xl text-white leading-relaxed italic lg:text-base font-medium">
              "Robots belong in homes when they are gentle, trustworthy, and genuinely useful."
            </p>
            <footer className="mt-4 text-sm text-white/70">— Homu Team</footer>
          </blockquote>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                    activeMaterial === material.id
                      ? "bg-white text-neutral-900"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                  onClick={() => setActiveMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {material.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
