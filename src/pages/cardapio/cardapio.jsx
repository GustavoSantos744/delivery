import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CardProduto from "../../_components/CardProduto/card";
import styles from "./cardapio.module.css";
import LoadingSpinner from "../../_components/LoadingSnipper/loadingsnipper";

export default function Cardapio() {
  const { urlacesso } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [urlacesso]);

  function detectarMime(base64) {
    if (!base64) return "image/jpeg";
    return "image/jpeg";
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["cardapio", urlacesso],

    queryFn: async () => {
      const resRest = await fetch(
        `http://192.168.3.107:3000/restaurante/${urlacesso}`,
        {
          headers: { auth: "4YGkIOKH29dNA1sKuXWVCItsJo0Cpv7E" },
          cache: "no-store",
        }
      );

      
      if (resRest.status === 404) {
        return { notFound: true };
      }

      if (!resRest.ok) throw new Error("Erro restaurante");

      const restaurante = await resRest.json();

      if (!restaurante?.TOKEN) {
        throw new Error("TOKEN inválido");
      }

      const resProd = await fetch(
        `http://192.168.3.107:3000/produtos`,
        {
          headers: { auth: restaurante.TOKEN },
          cache: "no-store",
        }
      );

      if (!resProd.ok) throw new Error("Erro produtos");

      const produtos = await resProd.json();

      return { produtos };
    },

    enabled: !!urlacesso,
  });

  if (isLoading) return <LoadingSpinner />;

  
  if (data?.notFound) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Restaurante não encontrado</h2>
        <p>Verifique o link e tente novamente.</p>
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ padding: 20 }}>
        Erro ao carregar cardápio.
      </p>
    );
  }

  const grupos = Array.isArray(data?.produtos) ? data.produtos : [];

  const temProdutos =
    grupos.length > 0 &&
    grupos.some((g) => g?.PRODUTOS?.length > 0);

  if (!temProdutos) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Nenhum produto encontrado</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {grupos.map((grupo) => (
        <div key={grupo?.CODIGO} className={styles.grupo}>
          <h2 className={styles.tituloGrupo}>
            {grupo?.DESCRICAO}
          </h2>

          <div className={styles.lista}>
            {(grupo?.PRODUTOS || []).map((p) => {
              const base64Limpo = p?.IMAGEM?.replace(/\s/g, "");

              let urlFinal = null;

              if (base64Limpo) {
                const mime = detectarMime(base64Limpo);
                urlFinal = `data:${mime};base64,${base64Limpo}`;
              }

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
      ))}
    </div>
  );
}