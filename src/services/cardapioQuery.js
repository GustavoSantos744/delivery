export async function buscarCardapio(urlacesso) {
  const resRest = await fetch(
    `/api/restaurante/${urlacesso}`,
    {
      headers: {
        auth: "4YGkIOKH29dNA1sKuXWVCItsJo0Cpv7E",
      },
      cache: "no-store",
    }
  );

  if (resRest.status === 404) {
    return { notFound: true };
  }

  if (!resRest.ok) {
    throw new Error("Erro restaurante");
  }

  const restaurante = await resRest.json();

  if (!restaurante?.TOKEN) {
    throw new Error("TOKEN inválido");
  }

  const resProd = await fetch(`/api/produtos`, {
    headers: {
      auth: restaurante.TOKEN,
    },
    cache: "no-store",
  });

  if (!resProd.ok) {
    throw new Error("Erro produtos");
  }

  const produtos = await resProd.json();

  return {
    restaurante,
    produtos,
  };
}