import React from "react";

import styles from "./navbar.module.css";

import { useParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {

  const { urlacesso } =
    useParams();

  const queryClient =
    useQueryClient();

  const data =
    queryClient.getQueryData([
      "cardapio",
      urlacesso,
    ]);

  const corData =
    queryClient.getQueryData([
      "cor-restaurante",
      urlacesso,
    ]);

  const restaurante =
    data?.restaurante;

  if (!restaurante)
    return null;

  // CONVERTE TColor DELPHI -> HEX CSS
  function converterCorDelphi(
    corDelphi
  ) {

    if (!corDelphi)
      return "#222";

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

    // RRGGBB

    return `#${rr}${gg}${bb}`;
  }

  const corPrincipal =
    converterCorDelphi(
      corData?.CORPRINCIPAL
    );

  const fantasia =
    restaurante?.FANTASIA ||
    "";

  const base64 =
    restaurante?.LOGO?.replace(
      /\s/g,
      ""
    );

  const logo = base64
    ? `data:image/jpeg;base64,${base64}`
    : null;

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.left}
      >
        {logo && (
          <img
            src={logo}
            alt="logo"
            className={
              styles.logoImg
            }
          />
        )}
      </div>

      <div
        className={
          styles.center
        }
      >
        <span
          className={
            styles.fantasia
          }
          style={{
            color:
              corPrincipal,
          }}
        >
          {fantasia}
        </span>
      </div>
    </nav>
  );
}