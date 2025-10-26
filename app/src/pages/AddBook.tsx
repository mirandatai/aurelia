export default function AddBook() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-wine">Adicionar Livro</h2>
      <p className="text-inkMuted">No MVP, buscaremos por título/autor/ISBN e permitiremos criação manual.</p>
      <div className="card">
        <label className="block text-sm text-inkMuted mb-2">Busca</label>
        <input className="w-full rounded-mdx border border-ink/10 bg-white/60 px-3 py-2" placeholder="Título, autor ou ISBN" />
        <div className="mt-3">
          <button className="btn btn-primary">Pesquisar</button>
        </div>
      </div>
    </div>
  )
}
