import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SupabaseAuthModal } from './SupabaseAuthModal';
import { ShieldAlert, Lock, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff' | 'bursar' | 'any';
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'any',
  fallbackTitle = 'Restricted Administrative Access',
  fallbackDescription = 'This management portal requires authenticated administrator or staff credentials via Supabase Auth.',
}) => {
  const { user, loading, role, isAdmin, isConfigured } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 1. Loading state
  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Verifying Supabase authentication session...</p>
      </div>
    );
  }

  // If Supabase is not yet configured with real API keys, allow fallback so admin can still test locally or preview
  if (!isConfigured) {
    return <>{children}</>;
  }

  // 2. Check if signed in
  if (!user) {
    return (
      <div className="min-h-[360px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{fallbackTitle}</h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            {fallbackDescription}
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full py-3 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 transition shadow-lg shadow-emerald-950/30 flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Supabase</span>
          </button>

          <SupabaseAuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    );
  }

  // 3. Check role requirement if specific role requested
  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div className="min-h-[360px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-red-900/50 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Insufficient Permissions</h3>
          <p className="text-sm text-slate-300 mb-4">
            Your account ({user.email}) does not have administrative privileges ({role || 'standard user'}).
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
