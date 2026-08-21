import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download as DownloadIcon, Apple, HardDrive, ExternalLink, CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/utils'

/*
 * ============================================================
 *  下载链接配置 — 阿里云 OSS
 * ============================================================
 *
 *  操作步骤：
 *  1. 登录阿里云 OSS 控制台
 *  2. 上传安装包到 Bucket
 *  3. 设置 Bucket 为公共读
 *  4. 配置 CORS，来源限制为 https://linktotext.vicrqky.space
 *  5. 将下方 URL 替换为对应文件的公网访问地址
 *
 *  注意：文件名中的空格需要编码为 %20
 * ============================================================
 */

const DOWNLOADS = {
  mac: {
    label: 'macOS',
    icon: Apple,
    versions: {
      'v1.0': {
        label: '稳定版',
        badge: null,
        filename: 'Link to Text-1.0.0-arm64.dmg',
        url: 'https://linktotext.oss-cn-hangzhou.aliyuncs.com/Link%20to%20Text-1.0.0-arm64-stable.dmg',
        size: '~1GB',
      },
      'v2.0-beta': {
        label: '测试版',
        badge: 'Beta',
        filename: 'Link to Text-2.0-beta-arm64.dmg',
        url: '', // 即将推出
        size: '~2GB',
        disabled: true,
        comingSoon: true,
      },
    },
  },
  windows: {
    label: 'Windows',
    icon: HardDrive,
    versions: {
      'v1.0': {
        label: '稳定版',
        badge: null,
        filename: 'Link to Text Setup 1.0.0-stable.exe',
        url: 'https://linktotext.oss-cn-hangzhou.aliyuncs.com/Link%20to%20Text%20Setup%201.0.0-stable.exe',
        size: '~1GB',
      },
      'v2.0-beta': {
        label: '测试版',
        badge: 'Beta',
        filename: 'Link.to.Text-1.0.0-setup-beta.exe',
        url: 'https://linktotext.oss-cn-hangzhou.aliyuncs.com/Link.to.Text-1.0.0-setup-beta.exe',
        size: '~1.2GB',
      },
    },
  },
}

const osKeys = ['mac', 'windows']
const versionKeys = ['v1.0', 'v2.0-beta']

export default function Download() {
  const [selectedOS, setSelectedOS] = useState('mac')
  const [selectedVersion, setSelectedVersion] = useState('v1.0')

  const os = DOWNLOADS[selectedOS]
  const version = os.versions[selectedVersion]

  return (
    <section id="download" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
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
            下载安装
          </h2>
          <p className="text-lg text-slate-500">
            选择你的平台，开始使用
          </p>
        </motion.div>

        {/* Download card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10">
            {/* OS selector */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {osKeys.map((key) => {
                const item = DOWNLOADS[key]
                const Icon = item.icon
                const isActive = selectedOS === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedOS(key)}
                    className={cn(
                      'relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-white/10'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="os-indicator"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(168,85,247,0.2))',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon size={18} className="relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Version selector */}
            <div className="flex items-center justify-center gap-3 mb-10">
              {versionKeys.map((key) => {
                const ver = os.versions[key]
                const isActive = selectedVersion === key
                const isDisabled = ver?.disabled
                return (
                  <button
                    key={key}
                    onClick={() => !isDisabled && setSelectedVersion(key)}
                    disabled={isDisabled}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300',
                      isDisabled
                        ? 'text-slate-600 border border-white/5 cursor-not-allowed opacity-50'
                        : isActive
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 cursor-pointer'
                          : 'text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/10 cursor-pointer'
                    )}
                  >
                    {ver?.badge && (
                      <span className={cn(
                        'px-1.5 py-0.5 text-[10px] font-bold rounded uppercase',
                        isDisabled
                          ? 'bg-slate-500/20 text-slate-500'
                          : 'bg-amber-500/20 text-amber-400'
                      )}>
                        {ver?.badge}
                      </span>
                    )}
                    <span>{isDisabled ? '即将推出' : ver.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Download button */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedOS}-${selectedVersion}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {version.disabled ? (
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-slate-400 font-semibold text-lg border border-white/10"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <span>即将推出</span>
                    </div>
                    <p className="text-sm text-slate-600">该版本正在测试中，敬请期待</p>
                  </div>
                ) : (
                  <a
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                      boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #a855f7, #c084fc)',
                        boxShadow: '0 0 60px rgba(139, 92, 246, 0.5)',
                      }}
                    />
                    <DownloadIcon size={22} className="relative z-10" />
                    <span className="relative z-10">
                      下载 Link to Text {version.label} for {os.label}
                    </span>
                    <ExternalLink size={16} className="relative z-10 opacity-60" />
                  </a>
                )}

                <div className="flex items-center gap-4 mt-5 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-violet-400" />
                    {version.filename}
                  </span>
                  <span className="text-slate-700">|</span>
                  <span>{version.size}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Install notes */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-sm text-slate-600 text-center mb-3">安装说明</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500">
                {selectedOS === 'mac' ? (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-violet-400 font-mono text-xs mt-0.5">01</span>
                      <span>下载 .dmg 安装包</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-violet-400 font-mono text-xs mt-0.5">02</span>
                      <span>双击打开，拖入 Applications</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-violet-400 font-mono text-xs mt-0.5">01</span>
                      <span>下载 .exe 安装程序</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-violet-400 font-mono text-xs mt-0.5">02</span>
                      <span>运行安装程序，按向导操作</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
