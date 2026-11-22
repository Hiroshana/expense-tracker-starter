const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const wholeCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatMoney = (value) =>
  Number.isInteger(value) ? wholeCurrency.format(value) : currency.format(value);

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const formatDate = (isoDate) => dateFormat.format(new Date(`${isoDate}T00:00:00Z`));

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
