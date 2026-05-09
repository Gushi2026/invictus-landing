import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://invictuslaplata.com";
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Hash anchors no entran en sitemap pero los dejamos comentados por si se hacen rutas
    // { url: `${base}/disciplinas`, ... },
    // { url: `${base}/coaches`, ... },
    // { url: `${base}/horarios`, ... },
    // { url: `${base}/sedes`, ... },
  ];
}
