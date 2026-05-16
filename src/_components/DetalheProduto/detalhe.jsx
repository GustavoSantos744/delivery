import styles from "./detalhe.module.css";

export default function DetalheProduto({ produto, fechar }) {
  if (!produto) return null;

  return (
    <div
      onClick={fechar}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        {/* BOTÃO FECHAR */}
        <button
          onClick={fechar}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-zinc-700 hover:bg-zinc-100"
        >
          ✕
        </button>

        {/* IMAGEM */}
        <div className="w-full h-56 bg-zinc-100">
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
              Sem imagem
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="p-4 flex flex-col gap-3">
          <h1 className="text-xl font-bold text-zinc-900">
            {produto.nome}
          </h1>

          <p className="text-sm text-zinc-500 leading-relaxed">
            {produto.descricao}
          </p>

          <span className="text-lg font-extrabold text-green-600">
            R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
          </span>

          <button
            className="mt-2 w-full py-3 rounded-xl text-white font-semibold transition hover:opacity-90 active:scale-[0.98]"
            style={{
              background: produto.corPrincipal || "#111",
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
