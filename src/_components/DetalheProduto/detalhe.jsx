import styles from "./detalhe.module.css";

export default function DetalheProduto({ produto, fechar }) {
  if (!produto) return null;

  return (
    <div className={styles.overlay} onClick={fechar}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.fechar} onClick={fechar}>
          ✕
        </button>

        <div className={styles.imagemBox}>
          <img
            src={produto.imagem}
            alt={produto.nome}
            className={styles.imagem}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.nome}>{produto.nome}</h1>

          <p className={styles.descricao}>{produto.descricao}</p>

          <span className={styles.preco}>
            R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
          </span>

          <button
            className={styles.botao}
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
