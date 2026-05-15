import React from "react";
import styles from "./navbar.module.css";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const { urlacesso } = useParams();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryState([
    "cardapio",
    urlacesso,
  ])?.data;

  const restaurante = data?.restaurante;

  if (!restaurante) return null;

  const fantasia = restaurante?.FANTASIA || "";

  const base64 = restaurante?.LOGO?.replace(
    /\s/g,
    ""
  );

  const logo = base64
    ? `data:image/jpeg;base64,${base64}`
    : null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        {logo && (
          <img
            src={logo}
            alt="logo"
            className={styles.logoImg}
          />
        )}
      </div>

      <div className={styles.center}>
        <span className={styles.fantasia}>
          {fantasia}
        </span>
      </div>
    </nav>
  );
}