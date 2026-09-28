import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, Globe, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onNavigate?: (route: string) => void;
}

export function LoginPage({ onLoginSuccess, onNavigate }: LoginPageProps) {
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('admin@revamp.ai');
  const [password, setPassword] = useState('AdminPass123!');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch {
      // Error managed in store
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-stone-50 px-4 py-12 text-stone-900">
      <div className="w-full max-w-md space-y-8">
        {/* Navigation to Landing Page */}
        {onNavigate && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => onNavigate('/landing')}
              className="inline-flex items-center text-xs font-semibold text-stone-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Enterprise Landing Page
            </button>
            <span className="text-xs font-mono text-stone-500">NTRO/NCIIPC PS-26154</span>
          </div>
        )}

        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white font-bold shadow-sm mb-1">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-extrabold tracking-wider text-stone-900 uppercase">REVAMP AI</h1>
          <p className="text-xs text-stone-500 max-w-sm">
            Automated Cybersecurity Intelligence & Multi-Artifact Transformation Platform
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="border-stone-200 bg-white shadow-card">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-stone-800 uppercase tracking-widest">
                OPERATOR ACCESS
              </CardTitle>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active Session
              </span>
            </div>
            <CardDescription className="text-xs text-stone-500">
              Enter your credentials to access the intelligence transformation console.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="flex items-center space-x-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <Input
                  label="Analyst Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@revamp.ai"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full font-semibold shadow-sm" isLoading={isLoading}>
                Authenticate Access
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials Note */}
        <div className="p-5 rounded-md bg-white border border-stone-200 shadow-subtle text-center space-y-1">
          <p className="text-xs font-semibold text-stone-700">
            Pre-Configured Demo Credentials:
          </p>
          <p className="text-xs text-stone-600 font-mono">
            <span className="text-orange-700 font-bold">admin@revamp.ai</span> / <span className="text-orange-700 font-bold">AdminPass123!</span>
          </p>
          <p className="text-xs text-stone-500">
            Click "Authenticate Access" above to enter directly with seeded sample projects.
          </p>
        </div>
      </div>
    </div>
  );
}
