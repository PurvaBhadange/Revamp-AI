"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, FileText, Layers, Settings2, ShieldCheck, Check } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export function LoginPage({ onNavigate, onLoginSuccess }: { onNavigate: (r: string) => void, onLoginSuccess: () => void }) {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('atharva@domain.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await login(email, 'password');
      onLoginSuccess();
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FDFCFB] font-sans">
      
      {/* LEFT SIDE: BRANDING & MARKETING */}
      <div className="w-1/2 relative hidden lg:flex flex-col">
        {/* Background Architecture Image (positioned to the bottom-left edge) */}
        <div className="absolute inset-0 bg-cover bg-left-bottom z-0" style={{ backgroundImage: `url('/architecture.jpg')` }} />
        {/* Gradients to fade out the image at the top and right so text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDFCFB]/80 to-[#FDFCFB] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCFB] via-[#FDFCFB]/90 to-transparent z-10" />
        
        {/* Left Side Content */}
        <div className="relative z-20 flex flex-col pt-16 px-16 h-full max-w-[640px] mx-auto w-full">
          
          {/* Logo */}
          <div className="flex items-center mb-16">
            <span className="text-[24px] font-black text-stone-950 tracking-tight">REVAMP</span>
            <span className="text-[24px] font-black text-[#C07050] tracking-tight">&nbsp;AI</span>
          </div>

          <div className="mb-12">
            <p className="text-[9px] font-bold tracking-[0.25em] text-[#C07050] uppercase mb-6">AI-Powered Content Transformation</p>
            <h1 className="text-[52px] font-black text-stone-950 tracking-tight leading-[1.05] mb-6 pr-12">
              Transform<br/>information<br/>into<br/>communication.
            </h1>
            <p className="text-[20px] text-stone-600 font-medium leading-tight">
              Same source. Multiple formats.<br/>Real impact.
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-auto mb-16 pl-4">
            
            <div className="flex gap-5 items-start">
              <FileText className="h-6 w-6 text-stone-700 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h4 className="text-[13px] font-bold text-stone-900 mb-0.5">Multiple input formats</h4>
                <p className="text-[11px] text-stone-500 font-medium">Documents, images, audio, video, text, URLs</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-start">
              <Layers className="h-6 w-6 text-stone-700 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h4 className="text-[13px] font-bold text-stone-900 mb-0.5">Tailored outputs</h4>
                <p className="text-[11px] text-stone-500 font-medium">Summaries, advisory, social, presentations and more</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <Settings2 className="h-6 w-6 text-stone-700 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h4 className="text-[13px] font-bold text-stone-900 mb-0.5">Audience-aware</h4>
                <p className="text-[11px] text-stone-500 font-medium">Control tone, language and objective</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <ShieldCheck className="h-6 w-6 text-stone-700 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h4 className="text-[13px] font-bold text-stone-900 mb-0.5">Source traceable</h4>
                <p className="text-[11px] text-stone-500 font-medium">Maintain context and credibility</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FDFCFB]">
        
        <div className="w-full max-w-[440px] bg-white rounded-2xl border border-stone-200 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="mb-8">
            <h2 className="text-[28px] font-black text-stone-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-[14px] text-stone-500 font-medium">Sign in to your REVAMP AI account</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            <div>
              <label className="block text-[13px] font-bold text-stone-900 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" strokeWidth={1.5} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atharva@domain.com"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-stone-200 text-[14px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-stone-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" strokeWidth={1.5} />
                <input 
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-11 pr-11 rounded-lg border border-stone-200 text-[14px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050] transition-colors"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                >
                  {showPass ? <EyeOff className="h-5 w-5" strokeWidth={1.5} /> : <Eye className="h-5 w-5" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1 mb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`h-5 w-5 rounded flex items-center justify-center border transition-colors ${remember ? 'bg-[#9E573F] border-[#9E573F]' : 'bg-white border-stone-300 group-hover:border-[#9E573F]'}`}>
                  {remember && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={remember} 
                  onChange={(e) => setRemember(e.target.checked)} 
                />
                <span className="text-[13px] text-stone-700 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[13px] font-medium text-[#A35E47] hover:text-[#8B4A2F]">
                Forgot password?
              </a>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[15px] rounded-lg shadow-sm transition-colors"
              >
                {loading ? 'Signing in...' : (
                  <>Sign in <ArrowRight className="h-4 w-4" strokeWidth={2.5} /></>
                )}
              </button>
              
              <button 
                type="button"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await login('demo@domain.com', 'demo');
                  onLoginSuccess();
                }}
                className="w-full h-12 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[15px] rounded-lg shadow-sm transition-colors border border-stone-200"
              >
                Demo Login
              </button>
            </div>

          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-[12px] text-stone-400 font-medium">Or continue with</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-12 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[14px] font-black text-stone-900 tracking-tight">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-12 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 21 21">
                <path fill="#f25022" d="M1 1h9v9H1z"/>
                <path fill="#00a4ef" d="M1 11h9v9H1z"/>
                <path fill="#7fba00" d="M11 1h9v9h-9z"/>
                <path fill="#ffb900" d="M11 11h9v9h-9z"/>
              </svg>
              <span className="text-[14px] font-black text-stone-900 tracking-tight">Microsoft</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-stone-500 font-medium">
              Don't have an account? <a href="#" className="font-bold text-[#A35E47] hover:text-[#8B4A2F]">Create account</a>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
