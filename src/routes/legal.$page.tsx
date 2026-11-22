import { createFileRoute, Link, notFound } from "@tanstack/react-router";

const PAGES: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the details you share through the contact form or WhatsApp — your name, email and message — to respond to your enquiry.",
      "Your information is never sold or shared with third parties. Website analytics are anonymised and used only to improve this site.",
      "To request deletion of your data, email hello@rjseodigital.in.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "All services are delivered according to a written proposal agreed before work begins.",
      "SEO results depend on search engine algorithms and competition; no specific ranking is guaranteed.",
      "Invoices are payable within 7 days. Reports and deliverables remain confidential to the client.",
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    body: [
      "Monthly retainers can be cancelled with 15 days' written notice.",
      "Work completed up to the cancellation date is billable. One-time audits are non-refundable once delivered.",
    ],
  },
};

export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => {
    const page = PAGES[params.page];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Legal"} — RJ SEO Digital Tool India` },
      { name: "description", content: loaderData?.body[0] ?? "Legal information." },
      { property: "og:title", content: loaderData?.title ?? "Legal" },
      { property: "og:description", content: loaderData?.body[0] ?? "Legal information." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const page = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link to="/" className="text-sm text-primary">← Back home</Link>
      <h1 className="mt-6 text-4xl font-bold">{page.title}</h1>
      <div className="mt-8 space-y-4 text-muted-foreground">
        {page.body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </main>
  );
}
