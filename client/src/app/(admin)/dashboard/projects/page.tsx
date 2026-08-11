import { ProjectsClient } from "@/components/admin/projects/projects.client";
import {serverListProjects} from "@/app/actions";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function AdminProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? "";

  const projectsResponse = await serverListProjects({
    page,
    limit: 10,
    search,
  });

  return (
    <ProjectsClient
      initialData={projectsResponse}
      page={page}
      search={search}
    />
  );
}
