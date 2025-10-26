import { Outlet, Link, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-dvh bg-paper text-ink font-body">
      <header className="px-5 pt-5 pb-3 flex items-center gap-3">
        <img src="/logo.png" alt="Aurélia" className="h-10 w-auto" />
        <div>
          <h1 className="font-display text-2xl text-ink">Aurélia</h1>
          <p className="text-inkMuted">Biblioteca Poética</p>
        </div>
      </header>
      <main className="px-4 pb-24">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-paper/90 backdrop-blur border-t border-ink/10">
        <ul className="flex justify-around py-3 text-sm">
          <li>
            <Link to="/" className={pathname==='/'? 'text-wine font-semibold':'text-inkMuted'}>Início</Link>
          </li>
          <li>
            <Link to="/add" className={pathname.startsWith('/add')? 'text-wine font-semibold':'text-inkMuted'}>Adicionar</Link>
          </li>
          <li>
            <Link to="/session" className={pathname.startsWith('/session')? 'text-wine font-semibold':'text-inkMuted'}>Sessão</Link>
          </li>
          <li>
            <Link to="/chat" className={pathname.startsWith('/chat')? 'text-wine font-semibold':'text-inkMuted'}>Chat</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
