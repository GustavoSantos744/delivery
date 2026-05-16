import React from "react";
import styles from "./cardgrupo.module.css";

export default function CardGrupo({
  grupos = [],
  corPrincipal = "#22c55e",
}) {
  function irParaGrupo(id) {
    const el = document.getElementById(id);

    if (!el) return;

    const offset = 80;

    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    // =========================
    // highlight visual no grupo
    // =========================

    el.classList.add("grupo-focus");

    const titulo =
      el.querySelector("h2");

    if (titulo) {
      titulo.classList.add("titulo-ativo");

      setTimeout(() => {
        titulo.classList.remove("titulo-ativo");
      }, 500);
    }

    setTimeout(() => {
      el.classList.remove("grupo-focus");
    }, 300);
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