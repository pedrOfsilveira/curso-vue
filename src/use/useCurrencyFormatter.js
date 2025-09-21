import { useStoreSettings } from 'src/stores/storeSettings';

const storeSettings = useStoreSettings();

export function useCurrencyFormatter(value) {
  let posNegSymbol = value >= 0 ? "+" : "-";
  value = Math.abs(value);
  const currencySymbol = storeSettings.settings.currencySymbol;
  let amountFormatted = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`;
}
