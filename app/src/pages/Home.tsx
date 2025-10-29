import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useSession } from '@/hooks/useSession'

type ShelfItem = {
  id: string
  status: string
  primary_format: string | null
  book: { id: string; title: string; author: string | null; cover_url: string | null }
}

export default function Home() {
  const navigate = useNavigate()
  const { session, loading } = useSession()
  const [items, setItems] = useState<ShelfItem[]>([])

  useEffect(() => {
    if (loading) return
    if (!session) {
      navigate('/auth')
      return
    }
    ;(async () => {
      const { data, error } = await supabase
        .from('shelf_items')
        .select('id,status,primary_format, book:books(id,title,author,cover_url)')
        .order('created_at', { ascending: false })
      if (error) {
        console.error(error)
        return
      }
      setItems((data as any) || [])
    })()
  }, [loading, session, navigate])

  return (
    <div className="space-y-4">
      <section className="card">
        <h2 className="font-display text-xl text-wine mb-1">Leitura Atual</h2>
        {items.length === 0 ? (
          <p className="text-inkMuted">Adicione um livro para começar sua jornada.</p>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-16 w-12 rounded-mdx bg-wine/10 border border-wine/30" />
            <div>
              <p className="font-semibold">{items[0].book.title}</p>
              <p className="text-sm text-inkMuted">{items[0].book.author}</p>
            </div>
          </div>
        )}
      </section>
      <section className="card">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">Minha Estante</h3>
          <Link to="/add" className="btn btn-ghost">Adicionar</Link>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {items.map((it) => (
            <div key={it.id} className="aspect-[3/4] rounded-lgx border border-ink/10 bg-white/60 flex items-end p-2">
              <div>
                <p className="text-sm leading-tight line-clamp-2">{it.book.title}</p>
                <p className="text-xs text-inkMuted">{it.book.author}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <>
              <div className="aspect-[3/4] rounded-lgx border border-gold/40 bg-gold/10" />
              <div className="aspect-[3/4] rounded-lgx border border-olive/40 bg-olive/10" />
              <div className="aspect-[3/4] rounded-lgx border border-wine/40 bg-wine/10" />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
