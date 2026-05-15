import React from "react";
import styles from "./page.module.css";

export default function CardGrupo({ grupos = [] }) {
  function irParaGrupo(id) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className={styles.carrossel}>
      {grupos.map((grupo) => (
        <div
          key={grupo?.CODIGO}
          className={styles.card}
          onClick={() =>
            irParaGrupo(`grupo-${grupo?.CODIGO}`)
          }
        >
          {grupo?.DESCRICAO}
        </div>
      ))}
    </div>
  );
}