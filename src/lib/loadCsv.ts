import Papa from "papaparse"

export async function loadCsv<T = Formula>(path: string): Promise<T[]> {
  const text = await (await fetch(path)).text()
  return Papa.parse<T>(text, { header: true, skipEmptyLines: true, dynamicTyping: true }).data
}
