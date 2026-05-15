import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CardProduto from "../../_components/CardProduto/card";
import styles from "./cardapio.module.css";
import LoadingSpinner from "../../_components/LoadingSnipper/loadingsnipper";
import CampoBusca from "../../_components/Search/search";
import Navbar from "../../_components/Navbar/navbar";
import CardGrupo from "../../_components/CardGrupo/cardgrupo";

import { buscarCardapio } from "../../services/cardapioQuery";

export default function Cardapio() {
  const { urlacesso } = useParams();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [urlacesso]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cardapio", urlacesso],
    queryFn: () => buscarCardapio(urlacesso),
    enabled: !!urlacesso,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingSpinner />;

  if (data?.notFound) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Restaurante não encontrado</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Erro ao carregar cardápio</h2>
      </div>
    );
  }

  const grupos = Array.isArray(data?.produtos)
    ? data.produtos
    : [];

  return (
    <>
      <Navbar />

      <CampoBusca
        busca={busca}
        setBusca={setBusca}
      />

      {/* CARROSSEL DE GRUPOS */}
      <CardGrupo grupos={grupos} />

      <div className={styles.container}>
        {grupos.map((grupo) => {
          const produtosFiltrados = (grupo?.PRODUTOS || []).filter(
            (p) =>
              p?.DESCRICAO
                ?.toLowerCase()
                .includes(busca.toLowerCase())
          );

          if (produtosFiltrados.length === 0) return null;

          return (
            <div
              key={grupo?.CODIGO}
              id={`grupo-${grupo?.CODIGO}`}
              className={styles.grupo}
            >
              {/* NOME DO GRUPO */}
              <h2 className={styles.tituloGrupo}>
                {grupo?.DESCRICAO?.replace(/^\d+\s*-\s*/, "")}
              </h2>

              {/* 🔥 CARROSSEL DE PRODUTOS */}
              <div className={styles.lista}>
                {produtosFiltrados.map((p) => {
                  const base64Limpo =
                    p?.IMAGEM?.replace(/\s/g, "");

                  const urlFinal = base64Limpo
                    ? `data:image/jpeg;base64,${base64Limpo}`
                    : null;

                  return (
                    <CardProduto
                      key={p?.CODIGO}
                      nome={p?.DESCRICAO}
                      preco={p?.PRECO}
                      descricao={p?.OBSERVACAO}
                      imagem={urlFinal}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}