/**
 * Todas las variables son opcionales: sin ninguna, la app funciona con datos locales (mock).
 */
export type DataSource = "mock" | "drupal";

export const env = {
  dataSource: (process.env.DATA_SOURCE === "drupal" ? "drupal" : "mock") as DataSource,
  drupalBaseUrl: process.env.DRUPAL_BASE_URL?.replace(/\/$/, ""),
  revalidateSeconds: Number(process.env.DRUPAL_REVALIDATE_SECONDS ?? 300),
};
