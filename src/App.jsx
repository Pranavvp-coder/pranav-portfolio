import { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { Menu, X, CandlestickChart, LineChart, TrendingUp, Layers, Brain, ShieldCheck } from 'lucide-react'
import Background from './Background.jsx'

const LINKS = {
  discord: 'https://discord.gg/RrW8jYntx',
  youtube: 'https://www.youtube.com/@PranavvpFx',
  instagram: 'https://www.instagram.com/pranavvp.fx?psln=eHF1dmR2YXowNWR5&utm_source=qr',
}
const NAV = [['home', 'Home'], ['about', 'About'], ['trading', 'Trading'], ['phoenix', 'Phoenix FX'], ['connect', 'Connect']]

const Discord = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.3 4.4A19.8 19.8 0 0015.4 3l-.2.5a18 18 0 00-6.4 0L8.6 3a19.8 19.8 0 00-4.9 1.4C.6 9 0 13.5.3 18a19.9 19.9 0 006 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0012.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.9 19.9 0 006-3c.4-5.2-.7-9.700-3.400-13.600zM8.500 15.300c-1.200 0-2.100-1.100-2.100-2.400s.9-2.400 2.100-2.400 2.200 1.100 2.100 2.400c0 1.300-.9 2.400-2.100 2.400zm7 0c-1.200 0-2.100-1.100-2.100-2.400s.9-2.400 2.100-2.400 2.200 1.100 2.100 2.400c0 1.300-.9 2.400-2.100 2.400z"/></svg>
const YouTube = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23.500 6.200a3 3 0 00-2.100-2.100C19.500 3.600 12 3.600 12 3.600s-7.500 0-9.400.5A3 3 0 00.5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 002.100 2.100c1.900.5 9.400.5 9.400.5s7.500 0 9.400-.5a3 3 0 002.100-2.100c.5-1.900.5-5.800.5-5.800s0-3.900-.5-5.800zM9.600 15.600V8.400l6.200 3.600-6.200 3.600z"/></svg>
const Instagram = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r="1" fill="currentColor"/></svg>

const SOCIALS = [
  { key: 'discord', Icon: Discord, title: 'Join the community', text: 'Connect, discuss, and grow with the trading community.', cta: 'Join Discord' },
  { key: 'youtube', Icon: YouTube, title: 'Watch my journey', text: 'Trading content, market insights, and my journey in the financial markets.', cta: 'Subscribe on YouTube' },
  { key: 'instagram', Icon: Instagram, title: 'Follow my journey', text: 'Follow my trading journey and latest updates.', cta: 'Follow on Instagram' },
]

const TOPICS = [
  [CandlestickChart, 'Forex trading', 'Learning how currency pairs move and what drives them.'],
  [LineChart, 'Technical analysis', 'Reading charts, levels, and patterns with a clear process.'],
  [TrendingUp, 'Price action', 'Studying raw price behavior instead of relying on noise.'],
  [Layers, 'Market structure', 'Understanding trends, ranges, and the shifts between them.'],
  [Brain, 'Trading psychology', 'Staying disciplined and patient when the market tests you.'],
  [ShieldCheck, 'Risk management', 'Protecting capital first, because consistency depends on it.'],
]

const ease = [0.22, 1, 0.36, 1]
const reveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const view = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } }

function Words({ text, className = '' }) {
  return (
    <motion.span variants={stagger} {...view} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease } } }} className="inline-block">{w}&nbsp;</motion.span>
        </span>
      ))}
    </motion.span>
  )
}

function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, transition: { duration: 0.6 } }} className="fixed inset-0 z-[100] grid place-items-center bg-ink">
          <div className="text-center">
            <motion.p initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.3em' }} transition={{ duration: 1 }} className="font-display text-xl font-semibold">PRANAV V P</motion.p>
            <div className="mx-auto mt-5 h-px w-40 overflow-hidden bg-white/10">
              <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.2, ease }} className="h-full bg-electric" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(scrollY > 30)
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-ink/80 backdrop-blur-xl border-b border-white/[0.08]' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#home" className="font-display text-lg font-bold tracking-wide">PRANAV V P</a>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="group relative text-sm text-muted transition-colors hover:text-white">{label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" /></a></li>
          ))}
        </ul>
        <button className="grid h-11 w-11 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden md:hidden">
            {NAV.map(([id, label], i) => (
              <motion.li key={id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block border-t border-white/[0.06] px-5 py-4 font-display text-lg">{label}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

const Btn = ({ href, primary, children, ...r }) => (
  <a href={href} {...r} className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-7 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${primary ? 'bg-accent text-white hover:bg-electric hover:shadow-[0_8px_30px_-8px_#1677FF]' : 'border border-white/15 text-white hover:border-electric hover:bg-white/5'}`}>{children}</a>
)

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-14">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}>
          <motion.span variants={reveal} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />TRADING • MARKETS • JOURNEY
          </motion.span>
          <motion.h1 variants={reveal} className="mt-7 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">PRANAV<br />V P</motion.h1>
          <motion.p variants={reveal} className="mt-6 font-display text-xl text-electric sm:text-2xl">Exploring the Markets. Building My Trading Journey.</motion.p>
          <motion.p variants={reveal} className="mt-5 max-w-lg leading-relaxed text-muted">I'm Pranav. A trader and entrepreneur documenting my journey through financial markets, trading strategies, market psychology, and continuous learning.</motion.p>
          <motion.div variants={reveal} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Btn primary href="#about">EXPLORE MY JOURNEY</Btn>
            <Btn href="#connect">JOIN MY COMMUNITY</Btn>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, clipPath: 'inset(8% 8% 8% 8% round 32px)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 32px)' }} transition={{ duration: 1.3, ease, delay: 1.6 }} className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-6 -z-10 rounded-[48px] bg-accent/20 blur-3xl" aria-hidden="true" />
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.5, ease }} className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-panel p-2">
            <img src="/images/profile.png" alt="Portrait of Pranav V P" width="1254" height="1254" fetchpriority="high" className="aspect-square w-full rounded-[24px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="pointer-events-none absolute inset-2 rounded-[24px] bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-ink/70 px-4 py-2 text-xs backdrop-blur">Phoenix FX</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative px-5 py-24 sm:px-8 sm:py-32 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>
)
const Heading = ({ children }) => <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{children}</h2>

function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Heading><Words text="ABOUT ME" /></Heading>
        <motion.div variants={stagger} {...view} className="space-y-5 text-lg leading-relaxed text-muted">
          <motion.p variants={reveal} className="text-xl text-white">I'm Pranav V P, a college student, entrepreneur, and trading enthusiast.</motion.p>
          <motion.p variants={reveal}>My journey revolves around understanding financial markets, developing trading skills, studying price movements, and continuously improving my knowledge.</motion.p>
          <motion.p variants={reveal}>I believe trading is not just about finding entries and exits. It is about discipline, patience, risk management, and consistency.</motion.p>
          <motion.p variants={reveal}>I'm documenting my journey while building my identity in the trading world.</motion.p>
        </motion.div>
      </div>
    </Section>
  )
}

function Trading() {
  return (
    <Section id="trading" className="bg-panel/60">
      <Heading><Words text="MY WORLD IS THE MARKET" /></Heading>
      <motion.div variants={stagger} {...view} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map(([Icon, t, d]) => (
          <motion.article key={t} variants={reveal} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink/60 p-7 transition-colors duration-300 hover:border-electric/50">
            <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100" />
            <Icon size={28} strokeWidth={1.5} className="text-electric" />
            <h3 className="mt-6 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function Phoenix() {
  return (
    <Section id="phoenix">
      <motion.div variants={stagger} {...view} className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-panel px-6 py-20 text-center sm:px-16 sm:py-28">
        <div className="absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
        <motion.p variants={reveal} className="relative text-sm tracking-[0.3em] text-muted">THE BRAND</motion.p>
        <motion.h2 variants={reveal} className="relative mt-4 font-display text-5xl font-bold tracking-tight sm:text-8xl">PHOENIX FX</motion.h2>
        <motion.p variants={reveal} className="relative mt-4 font-display text-xl text-electric sm:text-3xl">TRUST THE CANDLES.</motion.p>
        <motion.p variants={reveal} className="relative mx-auto mt-8 max-w-2xl leading-relaxed text-muted">Phoenix FX represents my trading identity and community, built around market learning, trading discussions, and the journey of understanding financial markets.</motion.p>
      </motion.div>
    </Section>
  )
}

function Connect() {
  return (
    <Section id="connect" className="bg-panel/60">
      <Heading><Words text="CONNECT WITH ME" /></Heading>
      <motion.div variants={stagger} {...view} className="mt-14 grid gap-5 md:grid-cols-3">
        {SOCIALS.map(({ key, Icon, title, text, cta }) => (
          <motion.div key={key} variants={reveal} whileHover={{ y: -8 }} className="group flex flex-col rounded-2xl border border-white/[0.08] bg-ink/70 p-8 transition-colors duration-300 hover:border-electric/60">
            <span className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-electric transition-colors group-hover:bg-accent group-hover:text-white"><Icon width={26} height={26} /></span>
            <h3 className="mt-7 font-display text-2xl font-semibold uppercase">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{text}</p>
            <div className="mt-8"><Btn primary href={LINKS[key]} target="_blank" rel="noopener noreferrer">{cta.toUpperCase()}</Btn></div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <p className="font-display text-xl font-bold tracking-wide">PRANAV V P</p>
        <p className="text-sm text-muted">Exploring Markets. Building My Journey.</p>
        <p className="text-sm text-electric">Phoenix FX — Trust the Candles.</p>
        <div className="flex gap-3">
          {SOCIALS.map(({ key, Icon, cta }) => (
            <a key={key} href={LINKS[key]} target="_blank" rel="noopener noreferrer" aria-label={cta} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted transition-all hover:border-electric hover:text-white"><Icon width={18} height={18} /></a>
          ))}
        </div>
        <p className="text-xs text-muted/70">© {new Date().getFullYear()} Pranav V P. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [done, setDone] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDone(true), 1500); return () => clearTimeout(t) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <Loader done={done} />
      <Background />
      <Navbar />
      <main><Hero /><About /><Trading /><Phoenix /><Connect /></main>
      <Footer />
    </MotionConfig>
  )
}
