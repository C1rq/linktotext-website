import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mic, Users, FileText, Monitor } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: '语音识别',
    desc: '基于 SenseVoice 的高精度语音转写，支持中文普通话，识别准确率行业领先',
    color: '#8b5cf6',
  },
  {
    icon: Users,
    title: '说话人识别',
    desc: '自动区分多人对话中的不同说话人，让会议记录、播客转写更加清晰',
    color: '#a855f7',
  },
  {
    icon: FileText,
    title: 'Word 导出',
    desc: '一键导出格式化文档，支持自定义标题、说话人名称，即开即用',
    color: '#c084fc',
  },
  {
    icon: Monitor,
    title: '多平台支持',
    desc: '原生桌面应用，支持 macOS 和 Windows，本地运行保护隐私',
    color: '#7c3aed',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Features() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            为什么选择 Link to Text
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            从视频下载到文字输出，一站式完成
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative p-8 rounded-3xl cursor-default transition-all duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 70%)`,
                  }}
                />
                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    border: `1px solid ${feature.color}30`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${feature.color}15`,
                      boxShadow: `0 0 20px ${feature.color}10`,
                    }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Image placeholders */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-center text-sm text-slate-600 mb-6 tracking-wider uppercase">
            产品界面预览
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="group relative aspect-video rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '2px dashed rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(139,92,246,0.05) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3 text-slate-600 group-hover:text-slate-400 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-violet-500/20 transition-all duration-300">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">上传产品截图 {i}</p>
                    <p className="text-xs text-slate-700 mt-1">建议尺寸 1200×675</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
