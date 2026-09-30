/**
 * Las descripciones vienen como texto plano (Excel o CMS). Si son una lista
 * ("- item - item" o "a | b | c") se separan en viñetas; si no, en un párrafo.
 */
export function parseDescription(text: string): { paragraph?: string; bullets: string[] } {
  const clean = text.trim();
  if (!clean) return { bullets: [] };
  if (clean.startsWith("- ")) {
    return { bullets: clean.replace(/^-\s+/, "").split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean) };
  }
  if (clean.includes(" | ")) {
    return { bullets: clean.split("|").map((s) => s.trim()).filter(Boolean) };
  }
  return { paragraph: clean, bullets: [] };
}
