import { Mail, Phone, Zap, CheckSquare, Lock, User, Send, Check } from 'lucide-react'
import { CONTACT } from '@/data/constants'

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0e1116] p-8 sm:p-10 lg:p-14 border border-white/5 shadow-2xl">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#ff7600]/15 blur-[100px]" />
        
        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="mb-2">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff7600]">Let's Work Together</p>
              <div className="mt-2 h-[2px] w-6 bg-[#ff7600]"></div>
            </div>
            
            <h2 className="mt-4 text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-black leading-[1.05] tracking-tight text-white">
              Have a product idea or an experience that <span className="text-[#ff7600]">needs fixing?</span>
            </h2>
            
            <p className="mt-6 max-w-[440px] text-[15px] sm:text-[17px] leading-relaxed text-white/70">
              Send a short message about what you're building, what stage you're at, and what kind of product design support you need. I'll get back to you <span className="font-semibold text-[#ff7600]">within 24 hours.</span>
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff7600]">
                  <Zap size={14} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Clear process</p>
                  <p className="text-[12px] font-medium text-white/40">No guesswork</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff7600]">
                  <CheckSquare size={14} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Fast response</p>
                  <p className="text-[12px] font-medium text-white/40">Within 24h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff7600]">
                  <Lock size={14} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Confidential</p>
                  <p className="text-[12px] font-medium text-white/40">Your ideas are safe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff7600]">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Founder focused</p>
                  <p className="text-[12px] font-medium text-white/40">Outcome driven</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href={`mailto:${CONTACT.email}`} className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#ff7600] px-6 transition hover:bg-[#e66a00] sm:w-auto">
                <Mail size={18} className="text-white" />
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-black text-white leading-tight">Email Me</span>
                  <span className="text-[11px] font-medium text-white/80 leading-tight">Send a message</span>
                </div>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#16a34a] px-6 transition hover:bg-[#15803d] sm:w-auto">
                <Phone size={18} className="text-white" fill="currentColor" />
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-black text-white leading-tight">Call Me</span>
                  <span className="text-[11px] font-medium text-white/80 leading-tight">Quick conversation</span>
                </div>
              </a>
              <a href={CONTACT.linkedin} className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#2563eb] px-6 transition hover:bg-[#1d4ed8] sm:w-auto">
                <div className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-sm bg-white">
                  <span className="text-[12px] font-black leading-none text-[#2563eb]">in</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-black text-white leading-tight">LinkedIn</span>
                  <span className="text-[11px] font-medium text-white/80 leading-tight">Let's connect</span>
                </div>
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-1 items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{CONTACT.email}</p>
                  <p className="text-[12px] text-white/40">Email</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{CONTACT.phoneDisplay}</p>
                  <p className="text-[12px] text-white/40">Phone / WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-10">
            <div>
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#ff7600]/40">
                <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-[#ff7600]"></div>
                <Send size={24} className="text-[#ff7600]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-6 text-xl font-bold text-white">What to include (optional)</h3>
              <ul className="flex flex-col gap-4">
                {[
                  "What you're building",
                  "Current stage",
                  "Main goals or problems",
                  "Timeline (if any)",
                  "Any reference or notes"
                ].map((text) => (
                  <li key={text} className="flex items-center gap-3">
                    <Check size={16} className="text-[#ff7600]" strokeWidth={3} />
                    <span className="text-[15px] text-white/70">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Minimalist Graphic representation instead of image */}
            <div className="mt-12 h-32 w-full rounded-xl bg-gradient-to-tr from-white/5 to-white/10 p-4 border border-white/10 relative overflow-hidden hidden sm:block">
               <div className="absolute right-[10px] top-4 w-24 h-40 rounded-xl bg-black border border-white/10 p-2 shadow-2xl rotate-[-5deg]">
                 <div className="w-full h-2 bg-white/10 rounded-full mb-2"></div>
                 <div className="w-2/3 h-2 bg-white/10 rounded-full mb-4"></div>
                 <div className="w-full h-8 bg-[#ff7600]/20 rounded-md border border-[#ff7600]/40 flex items-center justify-center mb-2">
                   <div className="w-4 h-4 bg-[#ff7600]/50 rounded-sm"></div>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full mb-2"></div>
               </div>
               <div className="absolute left-2 bottom-2 w-32 h-20 rounded-lg bg-[#141414] border border-white/10 p-2 shadow-2xl">
                 <div className="w-full h-2 bg-white/10 rounded-full mb-2"></div>
                 <div className="w-full flex-1 border border-white/10 rounded-md relative overflow-hidden">
                   <svg className="w-full h-full text-white/20" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2"/><line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2"/></svg>
                 </div>
               </div>
               <div className="absolute right-12 bottom-4 w-16 h-12 rounded-lg bg-[#111] border border-white/10 shadow-xl flex items-end justify-center p-2">
                 <svg className="w-full h-6 text-[#ff7600]" viewBox="0 0 100 50" preserveAspectRatio="none"><polyline points="0,50 30,30 60,40 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl bg-white/5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#ff7600]">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-currentColor"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5L12 0z"/></svg>
            </div>
            <div>
              <p className="text-[14px] font-bold text-white">Great products start with a conversation.</p>
              <p className="text-[13px] text-white/70">Let's build something people love to use.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-10 w-24 shrink-0 opacity-60 hidden sm:block">
               {/* Script Font / Signature Stand-in */}
               <svg viewBox="0 0 100 40" className="h-full w-full stroke-white fill-none"><path d="M10,25 C15,5 30,5 25,25 C20,40 5,40 15,30 C30,10 50,20 40,35 C30,50 15,20 35,15 C55,10 70,30 60,35 C50,40 40,25 60,20 C80,15 90,25 85,30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
            <div>
              <p className="text-[14px] font-bold text-white">Musaazi Ignatius</p>
              <p className="text-[12px] text-white/50">Product Designer & UX Strategist</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
