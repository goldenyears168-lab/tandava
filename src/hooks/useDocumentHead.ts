import { useEffect, useRef } from "react";

interface MetaAttrs {
  name?: string;
  property?: string;
  content: string;
  [key: string]: string | undefined;
}

interface LinkAttrs {
  rel: string;
  href: string;
  [key: string]: string | undefined;
}

export interface HeadConfig {
  title: string;
  meta: MetaAttrs[];
  link: LinkAttrs[];
  scripts: Array<{ type: string; text: string }>;
}

/**
 * Manages <head> tags via direct DOM manipulation with proper cleanup.
 * Replaces react-helmet-async — React 19 natively hoists <title>/<meta>/<link>
 * when rendered inside the component tree, but since we may run on React 18
 * in dev and this project needs SSR-agnostic head management, we manipulate
 * the DOM directly.
 */
export function useDocumentHead(config: HeadConfig): void {
  const cleanupRef = useRef<(() => void) | null>(null);

  // Serialise config for stable effect dependency
  const serialised = JSON.stringify(config);

  useEffect(() => {
    // Run previous cleanup
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const removed: (() => void)[] = [];

    // --- Title ---
    const previousTitle = document.title;
    document.title = config.title;
    removed.push(() => {
      document.title = previousTitle;
    });

    // --- Meta tags ---
    config.meta.forEach((attrs) => {
      // Remove any existing tag with the same identity key
      const identityKey = attrs.name ?? attrs.property ?? null;
      if (identityKey) {
        const selector = attrs.name
          ? `meta[name="${CSS.escape(attrs.name)}"]`
          : `meta[property="${CSS.escape(attrs.property!)}"]`;
        document.querySelectorAll(selector).forEach((el) => el.remove());
      }

      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => {
        if (v !== undefined) el.setAttribute(k, v);
      });
      document.head.appendChild(el);
      removed.push(() => el.remove());
    });

    // --- Link tags ---
    config.link.forEach((attrs) => {
      // Remove existing canonical if applicable
      if (attrs.rel === "canonical") {
        document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
      }

      const el = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => {
        if (v !== undefined) el.setAttribute(k, v);
      });
      document.head.appendChild(el);
      removed.push(() => el.remove());
    });

    // --- Script tags (JSON‑LD etc.) ---
    config.scripts.forEach(({ type, text }) => {
      const el = document.createElement("script");
      el.setAttribute("type", type);
      el.textContent = text;
      document.head.appendChild(el);
      removed.push(() => el.remove());
    });

    cleanupRef.current = () => {
      removed.forEach((fn) => fn());
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialised]);
}