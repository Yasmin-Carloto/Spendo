export default function formatToBRL(value) {
  if (value === null || value === undefined) return "0,00"

  const number = typeof value === "string" ? parseFloat(value) : value

  if (isNaN(number)) return "0,00"

  return number.toLocaleString("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}