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

  const temImagem = imagem && !erroImagem;

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
        <div className={styles.semImagem}>
          SEM IMAGEM
        </div>
      )}

      <div className={styles.info}>
        <span className={styles.nome}>
          {nome}
        </span>

        {descricao && (
          <span className={styles.desc}>
            {descricao}
          </span>
        )}

        <div className={styles.footer}>
          <span className={styles.preco}>
            R${" "}
            {Number(preco)
              .toFixed(2)
              .replace(".", ",")}
          </span>
        </div>
      </div>
    </div>
  );
}