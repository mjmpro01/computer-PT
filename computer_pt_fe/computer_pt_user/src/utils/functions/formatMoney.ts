export function formatMoney(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount);

  return `${formattedAmount}đ`;
}
