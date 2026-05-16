import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import CardProduto from "../../_components/CardProduto/card";

import DetalheProduto from "../../_components/DetalheProduto/detalhe";

import styles from "./cardapio.module.css";

import LoadingSpinner from "../../_components/LoadingSnipper/loadingsnipper";

import CampoBusca from "../../_components/Search/search";

import Navbar from "../../_components/Navbar/navbar";

import CardGrupo from "../../_components/CardGrupo/cardgrupo";

import { buscarCardapio } from "../../services/cardapioQuery";

import { buscarCorRestaurante } from "../../services/corQuery";

export default function Cardapio() {
  const { urlacesso } = useParams();

  const [busca, setBusca] =
    useState("");

  const [
    produtoSelecionado,
    setProdutoSelecionado,
  ] = useState(null);

  // sobe topo ao trocar restaurante
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [urlacesso]);

  // =====================================
  // CONVERTE TColor DELPHI -> HEX CSS
  // =====================================

  function converterCorDelphi(
    corDelphi
  ) {
    if (!corDelphi)
      return "#cecece";

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

    if (
      coresDelphi[corDelphi]
    ) {
      return coresDelphi[
        corDelphi
      ];
    }

    // Ex: $00B89706
    if (
      corDelphi.startsWith(
        "$00"
      )
    ) {
      const hex =
        corDelphi.replace(
          "$00",
          ""
        );

      // BBGGRR
      const bb =
        hex.substring(0, 2);

      const gg =
        hex.substring(2, 4);

      const rr =
        hex.substring(4, 6);

      return `#${rr}${gg}${bb}`;
    }

    if (
      corDelphi.startsWith("#")
    ) {
      return corDelphi;
    }

    return "#cecece";
  }

  // =====================================
  // QUERY CARDÁPIO
  // =====================================

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "cardapio",
      urlacesso,
    ],

    queryFn: () =>
      buscarCardapio(
        urlacesso
      ),

    enabled: !!urlacesso,

    staleTime:
      1000 * 60 * 5,
  });

  // =====================================
  // QUERY COR
  // =====================================

  const { data: corData } =
    useQuery({
      queryKey: [
        "cor-restaurante",
        urlacesso,
      ],

      queryFn: () =>
        buscarCorRestaurante(
          urlacesso
        ),

      enabled: !!urlacesso,

      staleTime:
        1000 * 60 * 10,
    });

  // =====================================
  // LOADING
  // =====================================

  if (isLoading)
    return <LoadingSpinner />;

  // =====================================
  // RESTAURANTE NÃO ENCONTRADO
  // =====================================

  if (data?.notFound) {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <h2>
          Restaurante não
          encontrado
        </h2>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    console.log(error);

    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <h2>
          Erro ao carregar
          cardápio
        </h2>
      </div>
    );
  }

  // =====================================
  // DADOS
  // =====================================

  const grupos =
    Array.isArray(
      data?.produtos
    )
      ? data.produtos
      : [];

  const corPrincipal =
    converterCorDelphi(
      corData?.CORPRINCIPAL
    ) || "#cecece";

  // =====================================
  // RENDER
  // =====================================

  return (
    <div>
      <Navbar />

      <CampoBusca
        busca={busca}
        setBusca={setBusca}
      />

      <CardGrupo
        grupos={grupos}
        corPrincipal={
          corPrincipal
        }
      />

      <div
        className={
          styles.container
        }
      >
        {grupos.map((grupo) => {
          const produtosFiltrados =
            (
              grupo?.PRODUTOS ||
              []
            ).filter((p) =>
              p?.DESCRICAO
                ?.toLowerCase()
                .includes(
                  busca.toLowerCase()
                )
            );

          if (
            produtosFiltrados.length ===
            0
          ) {
            return null;
          }

          return (
            <section
              key={
                grupo?.CODIGO
              }
              id={`grupo-${grupo?.CODIGO}`}
              className={
                styles.grupo
              }
            >
              <h2
                className={
                  styles.tituloGrupo
                }
                style={{
                  color:
                    corPrincipal,
                }}
              >
                {grupo?.DESCRICAO?.replace(
                  /^\d+\s*-\s*/,
                  ""
                )}
              </h2>

              <div
                className={
                  styles.lista
                }
              >
                {produtosFiltrados.map(
                  (p) => {
                    const base64Limpo =
                      p?.IMAGEM?.replace(
                        /\s/g,
                        ""
                      );

                    const urlFinal =
                      base64Limpo
                        ? `data:image/jpeg;base64,${base64Limpo}`
                        : null;

                    return (
                      <CardProduto
                        key={
                          p?.CODIGO
                        }
                        codigo={
                          p?.CODIGO
                        }
                        nome={
                          p?.DESCRICAO
                        }
                        preco={
                          p?.PRECO
                        }
                        descricao={
                          p?.OBSERVACAO
                        }
                        imagem={
                          urlFinal
                        }
                        corPrincipal={
                          corPrincipal
                        }
                        onClick={() =>
                          setProdutoSelecionado(
                            {
                              codigo:
                                p?.CODIGO,

                              nome: p?.DESCRICAO,

                              preco:
                                p?.PRECO,

                              descricao:
                                p?.OBSERVACAO,

                              imagem:
                                urlFinal,

                              corPrincipal:
                                corPrincipal,
                            }
                          )
                        }
                      />
                    );
                  }
                )}
              </div>
            </section>
          );
        })}
      </div>

      <DetalheProduto
        produto={
          produtoSelecionado
        }
        fechar={() =>
          setProdutoSelecionado(
            null
          )
        }
      />
    </div>
  );
}