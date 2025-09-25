"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "h1",
    name: "Homu One",
    price: "From $14,900",
    image: "https://www.1x.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feve.bc8fab20.png&w=1080&q=75",
    badge: "New" as const,
    materials: ["Bimanual manipulation", "Safe mobility", "Natural voice"],
    swatches: [
      { name: "Pearl", color: "#F2F4F7" },
      { name: "Graphite", color: "#111827" },
      { name: "Sand", color: "#C7BCA1" },
    ],
    quickLookImages: [
      "/robots/homu-one-1.jpg",
      "/robots/homu-one-2.jpg",
      "/robots/homu-one-3.jpg",
    ],
    dimensions: "H: 160cm · Mass: 45kg · Payload: 2kg/hand",
  },
  {
    id: "h2",
    name: "Homu Plus",
    price: "From $19,900",
    image: "https://image.mux.com/v26HW01w4lQOb7fYoIskHaHC83PP9WuNGAKKGHylmq9I/thumbnail.webp?time=0",
    badge: "New" as const,
    materials: ["Advanced dexterity", "Home mapping", "Edge AI safety"],
    swatches: [
      { name: "Pearl", color: "#F2F4F7" },
      { name: "Slate", color: "#334155" },
      { name: "Sand", color: "#C7BCA1" },
    ],
    quickLookImages: [
      "/robots/homu-plus-1.jpg",
      "/robots/homu-plus-2.jpg",
      "/robots/homu-plus-3.jpg",
    ],
    dimensions: "H: 165cm · Mass: 48kg · Payload: 3kg/hand",
  },
  {
    id: "h-lite",
    name: "Homu Lite",
    price: "From $9,900",
    image: "https://www.1x.tech/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqka6yvsc%2Fproduction%2Fc57005d5444e26dcdb1227970060ab689bfd09ea-3024x1694.webp%3Fq%3D100%26fit%3Dmax%26auto%3Dformat&w=3840&q=100",
    badge: "Limited" as const,
    materials: ["Essentials assistance", "Voice + app", "Auto-docking"],
    swatches: [
      { name: "Pearl", color: "#F2F4F7" },
      { name: "Graphite", color: "#111827" },
      { name: "Sky", color: "#94A3B8" },
    ],
    quickLookImages: [
      "/robots/homu-lite-1.jpg",
      "/robots/homu-lite-2.jpg",
      "/robots/homu-lite-3.jpg",
    ],
    dimensions: "H: 150cm · Mass: 39kg · Payload: 1.5kg/hand",
  },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Robots</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Explore Homu models designed for safe, capable assistance at home. Natural interaction meets reliable,
              everyday help.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
