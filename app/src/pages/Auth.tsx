import { Link } from 'react-router-dom'

export default function Auth() {
  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center px-6 text-center">
      <img src="/logo.png" alt="Aurélia" className="h-16 w-auto mb-4" />
      <h2 className="font-display text-3xl text-wine mb-1">Aurélia</h2>
      <p className="text-inkMuted mb-6">Biblioteca Poética</p>

      <div className="card w-full max-w-sm mx-auto">
        <button className="btn btn-primary w-full mb-3">Continuar com Google</button>
        <div className="text-xs text-inkMuted mb-3">ou</div>
        <input className="w-full rounded-mdx border border-ink/10 bg-white/60 px-3 py-2 mb-2" placeholder="Email" />
        <input type="password" className="w-full rounded-mdx border border-ink/10 bg-white/60 px-3 py-2" placeholder="Senha" />
        <button className="btn btn-primary w-full mt-3">Entrar</button>
        <button className="btn btn-ghost w-full mt-2">Criar conta</button>
        <Link to="/" className="block text-xs mt-3 text-wine">Voltar</Link>
      </div>
    </div>
  )
}
