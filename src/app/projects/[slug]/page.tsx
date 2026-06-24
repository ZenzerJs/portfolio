import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = new URL(`/projects/${slug}`, siteConfig.url);

  return {
    title: project.title,
    description: project.oneLiner,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      url: url.toString(),
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
