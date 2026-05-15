import React from "react";
import styles from "./page.module.css";

export default function CampoBusca({ busca, setBusca }) {
  return (
    <div className={styles.container}>
      <div className={styles.boxBusca}>
        <input
          type="text"
          placeholder="O que Gostaria de Pedir?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.inputBusca}
        />
      </div>
    </div>
  );
}