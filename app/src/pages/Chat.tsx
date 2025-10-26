export default function Chat() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-wine">Assistente Literária</h2>
      <div className="card">
        <p className="text-inkMuted">Em breve: chat com contexto do livro, progresso e humor.</p>
      </div>
      <div className="fixed bottom-20 inset-x-4">
        <div className="bg-white/80 backdrop-blur rounded-lgx shadow-soft p-2 flex gap-2">
          <input className="flex-1 bg-transparent px-3 py-2 outline-none" placeholder="Digite sua mensagem..." />
          <button className="btn btn-primary">Enviar</button>
        </div>
      </div>
    </div>
  )
}
