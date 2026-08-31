import { createFileRoute, notFound } from "@tanstack/react-router";
import { CompanyPageLayout } from "@/components/company-page-layout";
import { companiesData } from "@/data/companies";

export const Route = createFileRoute("/companies/$slug")({
  loader: ({ params }) => {
    const company = companiesData.find((c) => c.slug === params.slug);
    if (!company) {
      throw notFound();
    }
    return { company };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Company Not Found" }] };
    return {
      meta: [
        { title: `${loaderData.company.name} | ETEMAAD100 Group` },
        { name: "description", content: loaderData.company.shortDescription },
      ],
    };
  },
  component: CompanyRouteComponent,
});

function CompanyRouteComponent() {
  const { company } = Route.useLoaderData();
  return <CompanyPageLayout company={company} />;
}
