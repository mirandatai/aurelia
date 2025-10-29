import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const redirectTo = `${window.location.origin}/auth/callback`

  async function loginGoogle() {
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  async function loginEmail() {
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else navigate('/')
    setLoading(false)
  }

  async function signUpEmail() {
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Verifique seu email para confirmar a conta.')
    setLoading(false)
  }

  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center px-6 text-center">
      <img src="/logo.png" alt="Aurélia" className="h-16 w-auto mb-4" />
      <h2 className="font-display text-3xl text-wine mb-1">Aurélia</h2>
      <p className="text-inkMuted mb-6">Biblioteca Poética</p>

      <div className="card w-full max-w-sm mx-auto">
        <button onClick={loginGoogle} disabled={loading} className="btn btn-primary w-full mb-3">Continuar com Google</button>
        <div className="text-xs text-inkMuted mb-3">ou</div>
        <input className="w-full rounded-mdx border border-ink/10 bg-white/60 px-3 py-2 mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-mdx border border-ink/10 bg-white/60 px-3 py-2" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={loginEmail} disabled={loading} className="btn btn-primary w-full mt-3">Entrar</button>
        <button onClick={signUpEmail} disabled={loading} className="btn btn-ghost w-full mt-2">Criar conta</button>
        {message && <p className="text-xs text-wine mt-3">{message}</p>}
        <Link to="/" className="block text-xs mt-3 text-wine">Voltar</Link>
      </div>
    </div>
  )
}
