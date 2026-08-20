import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: '电子邮件',
    value: 'ruoqicheng7@gmail.com',
    href: 'mailto:ruoqicheng7@gmail.com',
    color: '#8b5cf6',
  },
  {
    icon: Mail,
    label: '问题反馈',
    value: 'ruoqicheng7@gmail.com',
    href: 'mailto:ruoqicheng7@gmail.com',
    color: '#c084fc',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            联系我们
          </h2>
          <p className="text-lg text-slate-500">
            如有问题或建议，欢迎随时联系
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contactMethods.map((method, i) => {
            const Icon = method.icon
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group relative p-8 rounded-3xl text-center transition-all duration-500 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${method.color}12 0%, transparent 70%)`,
                    border: `1px solid ${method.color}25`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${method.color}12`,
                    }}
                  >
                    <Icon size={26} style={{ color: method.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{method.label}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                    {method.value}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
