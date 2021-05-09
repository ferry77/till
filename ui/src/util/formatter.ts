export function currencyFormatter(amount: number, currency?: string) {
  const defaultCur = 'USD'

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ? currency : defaultCur,
  })

  return formatter.format(amount)
}
