'use client'

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

// Navigation arrow SVG components
function ArrowLeft({ className = '' }: { className?: string }) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      strokeWidth="1"
      stroke="currentColor"
    >
      <path d="M19 12H5M5 12L12 5M5 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      strokeWidth="1"
      stroke="currentColor"
    >
      <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Gallery data
const galleryItems = [
  {
    id: 1,
    images: [
      '/images/gallery-bouquet-redt-1.jpeg',
      '/images/gallery-bouquet-redt-2.jpeg',
      '/images/gallery-bouquet-redt-3.jpeg',
      '/images/gallery-bouquet-redt-4.jpeg',
      '/images/gallery-bouquet-redt-5.jpeg',
    ],
    title: 'Bouquet',
    subtitle: 'Passion in Bloom',
    description: 'A striking red bouquet that captures the intensity of nature\'s most passionate hues. Each stem arranged with deliberate grace.',
    index: '01',
  },
  {
    id: 2,
    images: [
      '/images/gallery-basket-pearl-1.jpeg',
      '/images/gallery-basket-pearl-2.jpeg',
      '/images/gallery-basket-pearl-3.jpeg',
    ],
    title: 'Flower Basket',
    subtitle: 'Pearl Elegance',
    description: 'Delicate pearl-toned blossoms woven into a charming basket arrangement. Soft sophistication in every petal.',
    index: '02',
  },
  {
    id: 3,
    images: [
      '/images/gallery-special-box-1.jpeg',
      '/images/gallery-special-box-2.jpeg',
      '/images/gallery-special-box-3.jpeg',
      '/images/gallery-special-box-4.jpeg',
      '/images/gallery-special-box-5.jpeg',
      '/images/gallery-special-box-6.jpeg',
    ],
    title: 'Special Box',
    subtitle: 'Curated Treasure',
    description: 'An artfully composed box arrangement that unveils like a hidden treasure. Beauty packaged with intention.',
    index: '03',
  },
  {
    id: 4,
    images: [
      '/images/gallery-special-mini-1.jpeg',
      '/images/gallery-special-mini-2.jpeg',
      '/images/gallery-special-mini-3.jpeg',
    ],
    title: 'Miniature',
    subtitle: 'Small Wonders',
    description: 'Petite yet captivating mini arrangements that prove the best things come in small packages.',
    index: '04',
  },
  {
    id: 5,
    images: [
      '/images/gallery-vase-christmas-1.jpeg',
      '/images/gallery-vase-christmas-2.jpeg',
      '/images/gallery-vase-christmas-3.jpeg',
      '/images/gallery-vase-christmas-4.jpeg',
      '/images/gallery-vase-christmas-5.jpeg',
    ],
    title: 'Christmas',
    subtitle: 'Festive Elegance',
    description: 'Holiday-inspired arrangements that bring warmth and festive spirit into any space.',
    index: '05',
  },
  {
    id: 6,
    images: [
      '/images/gallery-vase-whitet-1.jpeg',
      '/images/gallery-vase-whitet-2.jpeg',
      '/images/gallery-vase-whitet-3.jpeg',
      '/images/gallery-vase-whitet-4.jpeg',
    ],
    title: 'White Vase',
    subtitle: 'Pure Serenity',
    description: 'Clean white floral compositions that embody serenity and understated luxury.',
    index: '06',
  },
]

// Stacked images component with advanced motion
function StackedImages({ 
  images, 
  currentImageIndex, 
  onNext,
  direction 
}: { 
  images: string[]
  currentImageIndex: number
  onNext: () => void
  onPrev: () => void
  direction: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: dir < 0 ? 15 : -15,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    }),
  }

  // Background stacked images
  const stackOffsets = [
    { x: 8, y: 8, rotate: 2, scale: 0.97, opacity: 0.6 },
    { x: 16, y: 16, rotate: 4, scale: 0.94, opacity: 0.3 },
  ]

  return (
    <div 
      className="relative w-full aspect-[3/4] max-w-[400px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onNext}
    >
      {/* Stacked background layers */}
      {stackOffsets.map((offset, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-card"
          initial={false}
          animate={{
            x: isHovered ? offset.x * 1.5 : offset.x,
            y: isHovered ? offset.y * 1.5 : offset.y,
            rotate: isHovered ? offset.rotate * 1.2 : offset.rotate,
            scale: offset.scale,
            opacity: offset.opacity,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      
      {/* Main image with AnimatePresence */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Gallery"
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            draggable={false}
          />
        </AnimatePresence>
      </div>
      
      {/* Hover indicator */}
      <motion.div 
        className="absolute bottom-4 left-4 flex items-center gap-2 text-background mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs tracking-widest uppercase">Click to explore</span>
      </motion.div>

      {/* Image counter */}
      <motion.div 
        className="absolute top-4 right-4 text-background mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-xs tracking-widest font-mono">
          {String(currentImageIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
        </span>
      </motion.div>
    </div>
  )
}

// Gallery item component
function GalleryItem({ 
  item, 
  onNavigate,
  itemIndex,
  totalItems,
}: { 
  item: typeof galleryItems[0]
  onNavigate: (direction: number) => void
  itemIndex: number
  totalItems: number
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  const handleNextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const handlePrevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-16 lg:py-24"
      style={{ opacity }}
    >
      {/* Left arrow */}
      <motion.button
        onClick={() => onNavigate(-1)}
        className="hidden lg:flex p-4 hover:bg-secondary transition-colors duration-300 group disabled:opacity-30 shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={itemIndex === 0}
        aria-label="Previous collection"
      >
        <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
      </motion.button>

      {/* Stacked images */}
      <motion.div 
        className="w-full max-w-[350px] lg:max-w-[400px] shrink-0"
        style={{ y: springY }}
      >
        <StackedImages 
          images={item.images}
          currentImageIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          direction={direction}
        />
      </motion.div>
      
      {/* Content */}
      <div className="flex flex-col justify-center px-4 lg:px-0 space-y-6 max-w-sm">
        <motion.span 
          className="text-muted-foreground text-sm tracking-[0.3em] font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {item.index}
        </motion.span>
        
        <motion.h3 
          className="font-serif text-5xl lg:text-7xl font-light tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {item.title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground text-sm tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {item.subtitle}
        </motion.p>
        
        <motion.p 
          className="text-foreground/70 leading-relaxed max-w-xs text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {item.description}
        </motion.p>

        {/* Image navigation dots */}
        <motion.div 
          className="flex gap-2 pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {item.images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentImageIndex ? 1 : -1)
                setCurrentImageIndex(i)
              }}
              className="group p-1"
              aria-label={`Go to image ${i + 1}`}
            >
              <motion.span 
                className="block w-8 h-px transition-colors"
                animate={{ 
                  scaleX: i === currentImageIndex ? 1 : 0.6,
                  backgroundColor: i === currentImageIndex ? 'var(--foreground)' : 'var(--muted-foreground)'
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Right arrow */}
      <motion.button
        onClick={() => onNavigate(1)}
        className="hidden lg:flex p-4 hover:bg-secondary transition-colors duration-300 group disabled:opacity-30 shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={itemIndex === totalItems - 1}
        aria-label="Next collection"
      >
        <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      {/* Mobile navigation */}
      <div className="flex lg:hidden justify-center gap-8 pt-8 col-span-full">
        <motion.button
          onClick={() => onNavigate(-1)}
          className="p-4 border border-border hover:bg-secondary transition-colors duration-300 disabled:opacity-30"
          whileTap={{ scale: 0.95 }}
          disabled={itemIndex === 0}
          aria-label="Previous collection"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => onNavigate(1)}
          className="p-4 border border-border hover:bg-secondary transition-colors duration-300 disabled:opacity-30"
          whileTap={{ scale: 0.95 }}
          disabled={itemIndex === totalItems - 1}
          aria-label="Next collection"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Main Gallery Section
function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (direction: number) => {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < galleryItems.length) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <section id="gallery" className="min-h-screen py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-muted-foreground text-xs tracking-[0.4em] uppercase">Collection</span>
          <h2 className="font-serif text-4xl lg:text-6xl font-light mt-4 tracking-tight">
            Gallery
          </h2>
        </motion.div>

        {/* Gallery items */}
        <div ref={containerRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GalleryItem 
                item={galleryItems[currentIndex]}
                onNavigate={handleNavigate}
                itemIndex={currentIndex}
                totalItems={galleryItems.length}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <motion.div 
          className="flex justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="group p-2"
              aria-label={`Go to collection ${i + 1}`}
            >
              <motion.span 
                className="block w-12 h-px transition-colors"
                animate={{ 
                  backgroundColor: i === currentIndex ? 'var(--foreground)' : 'var(--muted)',
                  scaleX: i === currentIndex ? 1 : 0.6,
                }}
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-background/60 z-10" />
        <img 
          src="/images/gallery-bouquet-redt-1.jpeg" 
          alt="Crown Flora"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6"
        style={{ opacity }}
      >
        <motion.span 
          className="text-muted-foreground text-xs tracking-[0.5em] uppercase block mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Botanical Artistry
        </motion.span>
        
        <motion.h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Crown Flora
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mt-8 max-w-md mx-auto text-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Where nature meets artistry. Curated floral compositions for those who seek beauty in simplicity.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a 
            href="#gallery"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase hover:gap-5 transition-all duration-500"
          >
            <span>Explore</span>
            <span className="w-8 h-px bg-foreground" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Header
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
          padding: isScrolled ? '1rem 1.5rem' : '0',
        }}
      >
        <a href="/" className="font-serif text-xl tracking-wider">
          Crown Flora
        </a>

        <nav className="hidden md:flex items-center gap-12">
          <a href="#gallery" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Gallery
          </a>
          <a href="#about" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            About
          </a>
          <a 
            href="https://www.instagram.com/hannah_hallelujah/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Instagram
          </a>
        </nav>
      </motion.div>
    </motion.header>
  )
}

// About Section
function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" ref={ref} className="py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div 
            className="relative aspect-[4/5] overflow-hidden"
            style={{ y: imageY }}
          >
            <motion.img 
              src="/images/gallery-vase-whitet-1.jpeg"
              alt="About Crown Flora"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            className="space-y-8"
            style={{ y }}
          >
            <motion.span 
              className="text-muted-foreground text-xs tracking-[0.4em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Philosophy
            </motion.span>

            <motion.h2 
              className="font-serif text-4xl lg:text-5xl font-light tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Beauty exists in the space between intention and nature
            </motion.h2>

            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We believe in the quiet power of botanical artistry. Each composition is a meditation on form, 
              color, and the ephemeral nature of beauty. Our work exists at the intersection of design and 
              nature, creating moments of stillness in a world of constant motion.
            </motion.p>

            <motion.a
              href="https://www.instagram.com/hannah_hallelujah/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
            >
              <span>Follow our journey</span>
              <span className="w-8 h-px bg-foreground group-hover:w-12 transition-all duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="font-serif text-2xl tracking-wider">
            Crown Flora
          </div>

          <nav className="flex items-center gap-8">
            <a 
              href="https://www.instagram.com/hannah_hallelujah/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Instagram
            </a>
          </nav>

          <span className="text-muted-foreground text-xs tracking-widest">
            © 2025
          </span>
        </div>
      </div>
    </footer>
  )
}

// Smooth cursor follower
function CustomCursor() {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  // Only show on desktop
  if (!isMounted || (typeof window !== 'undefined' && window.innerWidth < 1024)) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-foreground pointer-events-none z-[100] mix-blend-difference hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
    />
  )
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Main page component
export default function CrownFloraPage() {
  return (
    <PageTransition>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Gallery />
        <About />
      </main>
      <Footer />
    </PageTransition>
  )
}
