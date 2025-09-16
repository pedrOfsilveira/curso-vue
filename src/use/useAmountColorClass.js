export function useAmountColorClass(value) {
  return value > 0
    ? "text-positive"
    : value < 0
    ? "text-negative"
    : "text-grey-6";
}
