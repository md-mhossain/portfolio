import { AdminProjectsClient } from "@/components/admin/projects/admin.projects.client";
import {projectsApi} from "@/lib/api/projects";

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

  const projectsResponse = await projectsApi.listAdmin({
    page,
    limit: 10,
    search,
  });

  console.log(projectsResponse);

  return (
    <AdminProjectsClient
      initialData={projectsResponse}
      page={page}
      search={search}
    />
  );
}
