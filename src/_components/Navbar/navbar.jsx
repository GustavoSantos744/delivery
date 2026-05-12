import React from "react";
import styles from "./navbar.module.css";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { urlacesso } = useParams();
  const queryClient = useQueryClient();

  const restauranteCache = queryClient.getQueryData([
    "restaurante",
    urlacesso,
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurante", urlacesso],

    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/restaurante/${urlacesso}`,
        {
          headers: { auth: "4YGkIOKH29dNA1sKuXWVCItsJo0Cpv7E" },
        }
      );

      
      if (res.status === 404) return null;

      if (!res.ok) throw new Error("Erro ao buscar restaurante");

      return res.json();
    },

    enabled: !!urlacesso && !restauranteCache,
    initialData: restauranteCache,
    staleTime: 1000 * 60 * 5,
  });

  
  if (isLoading) return null;
  if (error) return null;
  if (!data) return null;

  const fantasia = data?.FANTASIA || "";

  let logo = null;
  const base64 = data?.LOGO?.replace(/\s/g, "");

  if (base64) {
    logo = `data:image/jpeg;base64,${base64}`;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        {logo ? (
          <img src={logo} alt="Logo restaurante" className={styles.logoImg} />
        ) : (
          <span className={styles.logo}></span>
        )}
      </div>

      <div className={styles.center}>
        <span className={styles.fantasia}>{fantasia}</span>
      </div>
    </nav>
  );
}