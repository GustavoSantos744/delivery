import React, { useState } from "react";
import styles from "./page.module.css";

export default function CampoBusca() {
  const [busca, setBusca] = useState("");

  // Exemplo de produtos (depois você pode puxar da API)
  const produtos = [
 
  ];

  // Filtrar produtos
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Campo de busca */}
      <div className={styles.boxBusca}>
        <input
          type="text"
          placeholder="O que Gostaria de Pedir?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.inputBusca}
        />
      </div>

      {/* Lista */}
      <div className={styles.lista}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div key={produto.id} className={styles.cardProduto}>
              <span>{produto.nome}</span>
              <small>{produto.grupo}</small>
            </div>
          ))
        ) : (
          <p className={styles.semResultado}>Teste..</p>
        )}
      </div>
    </div>
  );
}