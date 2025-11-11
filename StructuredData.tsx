export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "OnlyVet",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "",
    "logo": (process.env.NEXT_PUBLIC_BASE_URL || "") + "/logo.svg",
    "medicalSpecialty": ["Veterinary"],
    "areaServed": "RU",
    "foundingDate": "2025",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@onlyvet.example"
    }
  };
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OnlyVet",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "",
    "potentialAction": {
      "@type": "SearchAction",
      "target": (process.env.NEXT_PUBLIC_BASE_URL || "") + "/knowledge?q={query}",
      "query-input": "required name=query"
    }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
    </>
  );
}
