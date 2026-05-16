import React from "react";

import styles from "./cardgrupo.module.css";

export default function CardGrupo({
  grupos = [],
  corPrincipal = "#22c55e",
}) {
  function irParaGrupo(id) {
    const el = document.getElementById(id);

    if (!el) return;

    // altura do topo/header
    const offset = 90;

    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.carrossel}>
      {grupos.map((grupo) => (
        <div
          key={grupo?.CODIGO}
          className={styles.card}
          style={{
            background:
              corPrincipal || "#22c55e",

            borderColor:
              corPrincipal || "#22c55e",

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