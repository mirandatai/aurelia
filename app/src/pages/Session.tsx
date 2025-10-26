export default function Session() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-wine">Sessão de Leitura</h2>
      <div className="card">
        <div className="flex items-center gap-3">
          <button className="btn btn-primary">Iniciar</button>
          <button className="btn btn-ghost">Pausar</button>
          <button className="btn btn-ghost">Encerrar</button>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-inkMuted mb-1">Progresso (%)</label>
          <input type="number" className="w-28 rounded-mdx border border-ink/10 bg-white/60 px-3 py-2" defaultValue={0} />
        </div>
      </div>
    </div>
  )
}
