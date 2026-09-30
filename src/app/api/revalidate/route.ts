import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "@/config/env";

/**
 * Webhook opcional para Drupal: POST /api/revalidate?brand=audi con cabecera x-revalidate-secret.
 * Solo tiene efecto cuando DRUPAL_REVALIDATE_SECRET está configurada; no es necesario en modo mock.
 */
export async function POST(request: Request) {
  if (!env.revalidateSecret || request.headers.get("x-revalidate-secret") !== env.revalidateSecret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const brand = new URL(request.url).searchParams.get("brand");
  if (!brand) return NextResponse.json({ ok: false, error: "brand requerido" }, { status: 400 });

  revalidateTag(`products:${brand}`, "max");
  revalidatePath(`/${brand}`, "layout");
  return NextResponse.json({ ok: true, brand });
}
