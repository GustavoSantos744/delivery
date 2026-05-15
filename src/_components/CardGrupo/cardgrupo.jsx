import React from "react";

import styles from "./cardgrupo.module.css";

export default function CardGrupo({
  grupos = [],
  corPrincipal = "#22c55e",
}) {

  function irParaGrupo(id) {

    const el =
      document.getElementById(id);

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
          style={{
            background:
              corPrincipal ||
              "#22c55e",

            borderColor:
              corPrincipal ||
              "#22c55e",

            color: "#fff",
          }}
          onClick={() =>
            irParaGrupo(
              `grupo-${grupo?.CODIGO}`
            )
          }
        >
          {grupo?.DESCRICAO?.replace(
            /^\d+\s*-\s*/,
            ""
          )}
        </div>
      ))}
    </div>
  );
}