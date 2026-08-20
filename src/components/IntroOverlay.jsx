import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const letters = "Link to Text".split('')

export default function IntroOverlay({ onComplete }) {
  const [show, setShow] = useState(true)
  const [typedCount, setTypedCount] = useState(0)
  const showSkip = true

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedCount(prev => {
        if (prev >= letters.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typedCount >= letters.length) {
      const t = setTimeout(() => {
        setShow(false)
        setTimeout(() => onComplete?.(), 600)
      }, 800)
      return () => clearTimeout(t)
    }
  }, [typedCount, onComplete])

  const handleSkip = () => {
    setShow(false)
    setTimeout(() => onComplete?.(), 600)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#0a0a0f' }}
        >
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
              style={{
                background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
                top: '20%',
                left: '30%',
                animation: 'float-slow 6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
              style={{
                background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
                bottom: '20%',
                right: '25%',
                animation: 'float-slow 8s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Main text */}
          <div className="relative z-10 flex items-center">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-glow 3s ease-in-out infinite',
              }}
            >
              {letters.slice(0, typedCount).join('')}
              <span
                className="inline-block w-[3px] h-[0.8em] ml-1 align-middle"
                style={{
                  background: 'linear-gradient(180deg, #c084fc, #8b5cf6)',
                  animation: 'cursor-blink 1s step-end infinite',
                  opacity: typedCount >= letters.length ? 0 : 1,
                }}
              />
            </h1>
          </div>

          {/* Skip button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              onClick={handleSkip}
              className="absolute bottom-12 right-12 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-lg border border-white/10 hover:border-white/20"
            >
              跳过动画
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
