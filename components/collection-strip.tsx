"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "care-assist",
    name: "CARE & ASSIST",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F6b25e5244d50ce4c8bff63b70641e6b1bb91b5ca-1951x2104.webp%3Ffit%3Dmax%26auto%3Dformat&w=1080&q=75",
    count: "Routines",
  },
  {
    id: "kitchen-help",
    name: "KITCHEN HELP",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F7ddeeed98b45cd0e27d4bfcaea3563b7b83001dc-3446x1880.png%3Frect%3D402%2C0%2C2642%2C1880%26w%3D2024%26h%3D1440%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1920&q=100",
    count: "Tasks",
  },
  {
    id: "home-maintenance",
    name: "HOME MAINTENANCE",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fimage.mux.com%2FHNAOXpxZRvafc8pJHaEzQMncqhU4sqrCa02GLebZf7TQ%2Fthumbnail.webp%3Fwidth%3D1024%26height%3D760%26time%3D0&w=1080&q=100",
    count: "Tasks",
  },
  {
    id: "mobility",
    name: "MOBILITY",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2Fc425d943534c2afa4b0c789177c0cda5e11e09d2-5746x3831.png%3Frect%3D181%2C0%2C5385%2C3831%26w%3D2024%26h%3D1440%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1920&q=100",
    count: "Capabilities",
  },
  {
    id: "interaction",
    name: "INTERACTION",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F73c51e5a4ced79055e3567e00e01337a7299fb00-2048x1080.jpg%3Frect%3D265%2C0%2C1518%2C1080%26w%3D1012%26h%3D720%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1080&q=100",
    count: "Capabilities",
  },
  {
    id: "safety",
    name: "SAFETY",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F53ada0664f97f3c88744617641aa8ecae1699b14-5000x3333.png%3Frect%3D158%2C0%2C4685%2C3333%26w%3D2024%26h%3D1440%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1920&q=100",
    count: "Systems",
  },
  {
    id: "charging",
    name: "CHARGING",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2Fcbbb8e86aa20cb42945089e491d4aeeef52e7e2f-2048x1194.png%3Frect%3D185%2C0%2C1678%2C1194%26w%3D1012%26h%3D720%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1080&q=100",
    count: "Systems",
  },
  {
    id: "apps",
    name: "APPS & INTEGRATIONS",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F83121feaa11b1a3cebf9ab91853219255921be05-3840x2160.png%3Frect%3D402%2C0%2C3036%2C2160%26w%3D1012%26h%3D720%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1080&q=100",
    count: "Services",
  },
  {
    id: "developers",
    name: "DEVELOPERS",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2F4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.png%3Frect%3D214%2C0%2C2052%2C1460%26w%3D2024%26h%3D1440%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=1920&q=100",
    count: "Docs",
  },
  {
    id: "research",
    name: "RESEARCH",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2Fbd5bb0534c39c69e8fc3b6b4bff418d05918e846-1116x1116.png%3Fw%3D2440%26q%3D100%26fit%3Dmax%26auto%3Dformat&w=3840&q=75",
    count: "Papers",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = collections.length * (itemWidth + 32) - 32 // subtract last gap
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">Explore Homu</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Browse categories from daily assistance to developer tools to learn how Homu fits into your life.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore collections →</p>
      </div>
    </section>
  )
}
