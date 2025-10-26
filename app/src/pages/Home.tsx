export default function Home() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h2 className="font-display text-xl text-wine mb-1">Leitura Atual</h2>
        <p className="text-inkMuted">Adicione um livro para começar sua jornada.</p>
      </section>
      <section className="card">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">Minha Estante</h3>
          <a href="/add" className="btn btn-ghost">Adicionar</a>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="aspect-[3/4] rounded-lgx border border-gold/40 bg-gold/10" />
          <div className="aspect-[3/4] rounded-lgx border border-olive/40 bg-olive/10" />
          <div className="aspect-[3/4] rounded-lgx border border-wine/40 bg-wine/10" />
        </div>
      </section>
    </div>
  )
}
