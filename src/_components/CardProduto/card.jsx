import { useState } from "react";
import styles from "./card.module.css";

export default function CardProduto({
  codigo,
  nome,
  preco,
  imagem,
  descricao,
  delay = 0,
  onClick,
}) {
  const [erroImagem, setErroImagem] = useState(false);
  const [verMais, setVerMais] = useState(false);

  const temImagem = imagem && !erroImagem;

  const descricaoLimitada =
    descricao && descricao.length > 80
      ? descricao.slice(0, 80) + "..."
      : descricao;

  return (
    <div
      className={styles.card}
      data-aos="fade-up"
      data-aos-delay={delay}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {temImagem ? (
        <img
          src={imagem}
          alt={nome}
          className={styles.imagem}
          onError={() => setErroImagem(true)}
        />
      ) : (
        <div className={styles.semImagem}>SEM IMAGEM</div>
      )}

      <div className={styles.info}>
        <span className={styles.nome}>{nome}</span>

        {descricao && (
          <>
            <span className={styles.desc}>
              {verMais ? descricao : descricaoLimitada}
            </span>

            {descricao.length > 80 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setVerMais(!verMais);
                }}
                className={styles.verMais}
              >
                {verMais ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </>
        )}

        <div className={styles.footer}>
          <span className={styles.preco}>
            R$ {Number(preco).toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
    </div>
  );
}