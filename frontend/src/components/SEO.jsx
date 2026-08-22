import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  schema,
  type = "website",
}) => {
  const location = useLocation();
  const fullCanonical = canonical || `https://symstruo.com${location.pathname}`;
  const pageTitle = title ? `${title} | SYMSTRUO` : "SYMSTRUO — Venture Creation Company | Build in Silence";
  const metaDescription = description || "SYMSTRUO is a global Venture Creation Company. We partner with founders to turn ideas into enduring businesses through venture strategy, business blueprints, brand architecture, growth systems, and investment readiness.";
  const metaKeywords = keywords || "SYMSTRUO, Venture Creation Company, Venture Studio, Business Architecture, Startup Growth Engine, Pitch Deck Preparation";

  useEffect(() => {
    // 1. Update Document Title
    document.title = pageTitle;

    // 2. Update Meta Description & Keywords
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", metaDescription);

    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement("meta");
      metaKey.setAttribute("name", "keywords");
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute("content", metaKeywords);

    // 3. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", fullCanonical);

    // 4. Update OpenGraph Tags
    const ogTags = {
      "og:title": pageTitle,
      "og:description": metaDescription,
      "og:url": fullCanonical,
      "og:type": type,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement("meta");
        ogMeta.setAttribute("property", property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute("content", content);
    });

    // 5. Dynamic Schema (JSON-LD)
    let schemaScript = document.getElementById("dynamic-schema-jsonld");
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "dynamic-schema-jsonld";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.text = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [pageTitle, metaDescription, fullCanonical, schema, type]);

  return null;
};
