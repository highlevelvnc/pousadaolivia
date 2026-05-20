import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { MOCK_ROOMS } from "@/lib/booking/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = [
    "",
    "/quartos",
    "/galeria",
    "/sobre",
    "/contato",
    "/reserva",
    "/politicas/reservas",
    "/politicas/cancelamento",
    "/politicas/termos",
    "/politicas/privacidade",
  ].map((p) => ({ url: `${base}${p || "/"}`, lastModified: now }));
  const rooms = MOCK_ROOMS.map((r) => ({ url: `${base}/quartos/${r.slug}`, lastModified: now }));
  return [...staticRoutes, ...rooms];
}
