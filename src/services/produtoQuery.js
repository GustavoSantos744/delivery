import { buscarCardapio } from "./cardapioQuery";

export async function buscarProdutoPorCodigo(urlacesso, codigo) {
  const data = await buscarCardapio(urlacesso);

  const grupos = data?.produtos || [];

  for (const grupo of grupos) {
    const produto = grupo?.PRODUTOS?.find(
      (p) => String(p.CODIGO) === String(codigo)
    );

    if (produto) {
      return produto;
    }
  }

  return null;
}