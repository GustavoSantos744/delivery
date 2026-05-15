import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./detalhe.module.css";
import LoadingSpinner from "../../_components/LoadingSnipper/loadingsnipper";
import { buscarProdutoPorCodigo } from "../../services/produtoQuery";

export default function DetalheProduto() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  // se você usa urlacesso no contexto/params global, adapte aqui
  const urlacesso = window.location.pathname.split("/")[1];

  const { data, isLoading } = useQuery({
    queryKey: ["produto", codigo],
    queryFn: () => buscarProdutoPorCodigo(urlacesso, codigo),
    enabled: !!codigo,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!data) {
    return (
      <div className={styles.container}>
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  const imagem =
    data?.IMAGEM
      ? `data:image/jpeg;base64,${data.IMAGEM.replace(/\s/g, "")}`
      : null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button className={styles.voltar} onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        {imagem && (
          <img src={imagem} alt={data.DESCRICAO} className={styles.imagem} />
        )}

        <h1 className={styles.nome}>{data.DESCRICAO}</h1>

        {data.OBSERVACAO && (
          <p className={styles.descricao}>{data.OBSERVACAO}</p>
        )}

        <span className={styles.preco}>
          R$ {Number(data.PRECO).toFixed(2).replace(".", ",")}
        </span>
      </div>
    </div>
  );
}