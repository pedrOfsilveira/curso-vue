export function useCurrencyFormatter(value) {
  let posNegSymbol = value >= 0 ? "+" : "-";
  value = Math.abs(value);
  let amountFormatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${posNegSymbol} ${amountFormatted}`;
}
