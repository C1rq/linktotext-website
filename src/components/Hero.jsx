import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const orbs = [
  { size: 500, x: '15%', y: '20%', color: '#8b5cf6', blur: 130, speed: 0.3, delay: 0 },
  { size: 400, x: '70%', y: '30%', color: '#a855f7', blur: 110, speed: 0.5, delay: 1 },
  { size: 350, x: '50%', y: '65%', color: '#6d28d9', blur: 100, speed: 0.4, delay: 2 },
  { size: 300, x: '25%', y: '75%', color: '#7c3aed', blur: 90, speed: 0.6, delay: 0.5 },
]

function FloatingOrb({ orb, index, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, orb.speed * 150])

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: orb.size,
        height: orb.size,
        left: orb.x,
        top: orb.y,
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        filter: `blur(${orb.blur}px)`,
        opacity: 0.15,
        y,
      }}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -5, 8, 0],
      }}
      transition={{
        duration: 12 + index * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: orb.delay,
      }}
    />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const handleScrollDown = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} orb={orb} index={i} scrollYProgress={scrollYProgress} />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
            color: '#c084fc',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          AI 驱动的语音识别
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Link to Text
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div style={{ y: subtitleY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-400 mb-4 font-light"
          >
            短视频语音转文字
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-slate-500 mb-12"
          >
            智能识别每一句话，自动区分说话人
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
            }}
          >
            <span className="relative z-10">立即下载</span>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #c084fc)',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)',
              }}
            />
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 rounded-2xl text-slate-400 font-medium text-lg border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            了解更多
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown
          size={20}
          className="text-slate-500"
          style={{ animation: 'bounce-chevron 2s ease-in-out infinite' }}
        />
      </motion.div>
    </section>
  )
}
