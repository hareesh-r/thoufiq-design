import { Helmet } from "react-helmet-async";
import site from "../../data/site.json";
import faqData from "../../data/faq.json";

type PageSEOProps = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
};

export function PageSEO({
  title,
  description,
  path = "/",
  ogImage,
  noindex = false,
}: PageSEOProps) {
  const { siteName, baseUrl, defaultOgImage } = site;
  const canonical = `${baseUrl.replace(/\/$/, "")}${path}`;
  const imagePath = ogImage || defaultOgImage;
  const imageUrl = imagePath
    ? `${baseUrl.replace(/\/$/, "")}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`
    : null;

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: site.seoTitle.split("—")[0]?.trim() || "UI/UX & Product Design Program",
    description: site.seoDescription,
    provider: { "@type": "Organization", name: siteName, url: baseUrl },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    description,
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(courseLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
  );
}
