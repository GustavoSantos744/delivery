import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CardProduto from "../../_components/CardProduto/card";
import DetalheProduto from "../../_components/DetalheProduto/detalhe";
import LoadingSpinner from "../../_components/LoadingSnipper/loadingsnipper";
import CampoBusca from "../../_components/Search/search";
import Navbar from "../../_components/Navbar/navbar";
import CardGrupo from "../../_components/CardGrupo/cardgrupo";

import { buscarCardapio } from "../../services/cardapioQuery";
import { buscarCorRestaurante } from "../../services/corQuery";

export default function Cardapio() {
  const { urlacesso } = useParams();

  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [urlacesso]);

  function converterCorDelphi(corDelphi) {
    if (!corDelphi) return "#cecece";

    const coresDelphi = {
      clBlack: "#000000",
      clWhite: "#FFFFFF",
      clRed: "#FF0000",
      clLime: "#00FF00",
      clBlue: "#0000FF",
      clYellow: "#FFFF00",
      clAqua: "#00FFFF",
      clFuchsia: "#FF00FF",
      clGray: "#808080",
      clSilver: "#C0C0C0",
      clMaroon: "#800000",
      clGreen: "#008000",
      clNavy: "#000080",
      clOlive: "#808000",
      clPurple: "#800080",
      clTeal: "#008080",
    };

    if (coresDelphi[corDelphi]) return coresDelphi[corDelphi];

    if (corDelphi.startsWith("$00")) {
      const hex = corDelphi.replace("$00", "");
      return `#${hex.substring(4, 6)}${hex.substring(2, 4)}${hex.substring(0, 2)}`;
    }

    if (corDelphi.startsWith("#")) return corDelphi;

    return "#cecece";
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["cardapio", urlacesso],
    queryFn: () => buscarCardapio(urlacesso),
    enabled: !!urlacesso,
    staleTime: 1000 * 60 * 5,
  });

  const { data: corData } = useQuery({
    queryKey: ["cor-restaurante", urlacesso],
    queryFn: () => buscarCorRestaurante(urlacesso),
    enabled: !!urlacesso,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <LoadingSpinner />;

  if (data?.notFound) {
    return (
      <div className="p-5">
        <h2 className="text-lg font-semibold">Restaurante não encontrado</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <h2 className="text-lg font-semibold text-red-600">
          Erro ao carregar cardápio
        </h2>
      </div>
    );
  }

  const grupos = Array.isArray(data?.produtos) ? data.produtos : [];

  const corPrincipal =
    converterCorDelphi(corData?.CORPRINCIPAL) || "#16a34a";

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navbar />

      {/* BUSCA */}
      <div className="px-4 py-3 max-w-[1400px] mx-auto">
        <CampoBusca busca={busca} setBusca={setBusca} />
      </div>

      {/* GRUPOS MENU */}
      <CardGrupo grupos={grupos} corPrincipal={corPrincipal} />

      {/* CONTAINER PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        {grupos.map((grupo) => {
          const produtosFiltrados = (grupo?.PRODUTOS || []).filter((p) =>
            p?.DESCRICAO?.toLowerCase().includes(busca.toLowerCase())
          );

          if (produtosFiltrados.length === 0) return null;

          return (
            <section
              key={grupo?.CODIGO}
              id={`grupo-${grupo?.CODIGO}`}
              className="mb-8 scroll-mt-20"
            >
              {/* TÍTULO */}
              <h2
                className="text-lg font-bold mb-3 text-zinc-900"
                style={{ color: corPrincipal }}
              >
                {grupo?.DESCRICAO?.replace(/^\d+\s*-\s*/, "")}
              </h2>

              {/* GRID PRODUTOS */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {produtosFiltrados.map((p) => {
                  const base64Limpo = p?.IMAGEM?.replace(/\s/g, "");
                  const urlFinal = base64Limpo
                    ? `data:image/jpeg;base64,${base64Limpo}`
                    : null;

                  return (
                    <CardProduto
                      key={p?.CODIGO}
                      codigo={p?.CODIGO}
                      nome={p?.DESCRICAO}
                      preco={p?.PRECO}
                      descricao={p?.OBSERVACAO}
                      imagem={urlFinal}
                      corPrincipal={corPrincipal}
                      onClick={(produto) =>
                        setProdutoSelecionado(produto)
                      }
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* MODAL DETALHE */}
      <DetalheProduto
        produto={produtoSelecionado}
        fechar={() => setProdutoSelecionado(null)}
      />
    </div>
  );
}