import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@portavia.com' && password === 'portavia2024') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-porta-dark flex items-center justify-center px-4 font-body">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #D32F2F 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D32F2F 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-white tracking-tight">
            Porta Via<span className="text-porta-red">.</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">
            Yönetim Paneli
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center w-14 h-14 bg-porta-red/10 rounded-xl mx-auto mb-6">
            <Lock className="w-7 h-7 text-porta-red" />
          </div>

          <h2 className="text-xl font-semibold text-white text-center mb-1">
            Giriş Yap
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Admin paneline erişmek için giriş yapın
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@portavia.com"
                  required
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-porta-red/50 focus:border-porta-red/50 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-porta-red/50 focus:border-porta-red/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-porta-red hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Giriş Yap
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-gray-600 text-xs text-center mt-6">
          © 2024 Porta Via Pizza — Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}
