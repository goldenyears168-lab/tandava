import { useDocumentHead, type HeadConfig } from "@/hooks/useDocumentHead";
import { useMemo } from "react";

interface SEOHeadProps {
  /** Page title — will be appended with " | Tandava" */
  title?: string;
  /** Meta description (max ~155 characters for search results) */
  description?: string;
  /** Canonical URL path (e.g., "/studios/lotus-flow") */
  canonical?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph type (default: "website") */
  ogType?: "website" | "article" | "profile" | "place";
  /** JSON-LD structured data object — will be serialized into a script tag */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  /** Prevent search engines from indexing this page */
  noindex?: boolean;
}

const DEFAULTS = {
  siteName: import.meta.env.VITE_APP_NAME || "Tandava",
  siteUrl: import.meta.env.VITE_APP_URL || "https://tandava.yoga",
  defaultDescription:
    "Book yoga classes, workshops, and appointments. Track your practice, connect with teachers, and join our wellness community.",
  defaultImage: "/og-image.png",
  twitterHandle: "@TandavaYoga",
};

export function SEOHead({
  title,
  description = DEFAULTS.defaultDescription,
  canonical,
  ogImage = DEFAULTS.defaultImage,
  ogType = "website",
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${DEFAULTS.siteName}`
    : `${DEFAULTS.siteName} | Book Classes & Track Your Practice`;

  const fullCanonical = canonical
    ? `${DEFAULTS.siteUrl}${canonical}`
    : undefined;

  const fullImage = ogImage.startsWith("http")
    ? ogImage
    : `${DEFAULTS.siteUrl}${ogImage}`;

  const headConfig: HeadConfig = useMemo(() => {
    const meta: HeadConfig["meta"] = [
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:image", content: fullImage },
      { property: "og:site_name", content: DEFAULTS.siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: DEFAULTS.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: fullImage },
    ];

    if (noindex) {
      meta.push({ name: "robots", content: "noindex, nofollow" });
    }

    if (fullCanonical) {
      meta.push({ property: "og:url", content: fullCanonical });
    }

    const link: HeadConfig["link"] = [];
    if (fullCanonical) {
      link.push({ rel: "canonical", href: fullCanonical });
    }

    const scripts: HeadConfig["scripts"] = [];
    if (structuredData) {
      scripts.push({
        type: "application/ld+json",
        text: JSON.stringify(
          Array.isArray(structuredData) ? structuredData : structuredData,
        ),
      });
    }

    return { title: fullTitle, meta, link, scripts };
  }, [
    description,
    fullTitle,
    ogType,
    fullImage,
    fullCanonical,
    noindex,
    structuredData,
  ]);

  useDocumentHead(headConfig);

  return null;
}