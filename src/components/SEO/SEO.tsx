import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object; // JSON-LD structured data
}

const SEO = ({
  title = "کلینیک دندان پزشکی طاها - بهترین خدمات دندانپزشکی",
  description = "کلینیک دندان پزشکی طاها ارائه دهنده بهترین خدمات دندانپزشکی با کادری مجرب و تجهیزات مدرن",
  keywords = "دندانپزشکی, کلینیک دندانپزشکی, دندانپزشک, خدمات دندانپزشکی, ایمپلنت, ارتودنسی, زیبایی دندان",
  image = "/images/logo.png",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  structuredData,
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const currentUrl = url || location.pathname + location.search;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullUrl = currentUrl.startsWith("http") ? currentUrl : `${siteUrl}${currentUrl}`;

  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
  ].join(", ");

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const [attrName, attrValue] = selector.match(/\[(.*?)="(.*?)"\]/)?.slice(1, 3) || [];
        if (attrName && attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Update meta tags
    updateMetaTag('meta[name="description"]', "content", description);
    updateMetaTag('meta[name="keywords"]', "content", keywords);
    updateMetaTag('meta[name="robots"]', "content", robotsContent);
    
    if (author) {
      updateMetaTag('meta[name="author"]', "content", author);
    }

    // Open Graph tags
    updateMetaTag('meta[property="og:type"]', "content", type);
    updateMetaTag('meta[property="og:url"]', "content", fullUrl);
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[property="og:image"]', "content", fullImageUrl);
    updateMetaTag('meta[property="og:locale"]', "content", "fa_IR");
    updateMetaTag('meta[property="og:site_name"]', "content", "کلینیک دندان پزشکی طاها");

    // Twitter tags
    updateMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    updateMetaTag('meta[name="twitter:url"]', "content", fullUrl);
    updateMetaTag('meta[name="twitter:title"]', "content", title);
    updateMetaTag('meta[name="twitter:description"]', "content", description);
    updateMetaTag('meta[name="twitter:image"]', "content", fullImageUrl);

    // Article specific tags
    if (type === "article") {
      if (author) {
        updateMetaTag('meta[property="article:author"]', "content", author);
      }
      if (publishedTime) {
        updateMetaTag('meta[property="article:published_time"]', "content", publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('meta[property="article:modified_time"]', "content", modifiedTime);
      }
    }

    // Canonical URL
    updateLinkTag("canonical", fullUrl);

    // Language attributes
    document.documentElement.lang = "fa";
    document.documentElement.dir = "rtl";

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, fullImageUrl, fullUrl, type, author, publishedTime, modifiedTime, robotsContent, structuredData]);

  return null;
};

export default SEO;

