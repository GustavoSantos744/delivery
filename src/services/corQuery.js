export async function buscarCorRestaurante(
  urlacesso
) {

  const response =
    await fetch(
      `/api/restaurante/${urlacesso}`,
      {
        headers: {
          auth:
            "4YGkIOKH29dNA1sKuXWVCItsJo0Cpv7E",
        },

        cache:
          "no-store",
      }
    );

  if (
    response.status === 404
  ) {
    return null;
  }

  if (!response.ok) {

    throw new Error(
      "Erro ao buscar cor"
    );
  }

  const restaurante =
    await response.json();

  return restaurante;
}