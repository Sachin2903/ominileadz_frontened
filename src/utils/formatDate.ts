export function formatDate(dateString: string): string {
  if (!dateString) {
    // Handle the null or empty case as desired
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  const date: Date = new Date(dateString);
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year: number = date.getFullYear();

  return `${day}-${month}-${year}`;
}
