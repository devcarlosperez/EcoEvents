export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('T')[0].split('-')
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
}