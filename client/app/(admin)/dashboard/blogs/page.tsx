import { AdminBlogsClient } from "@/components/admin/blogs/admin-blogs-client";
import { serverListBlogs } from "@/lib/api/server";

export default async function AdminBlogsPage() {
  const response = await serverListBlogs({
    page: 1,
    limit: 10,
    search: "",
  });

  return (
    <AdminBlogsClient
      initialBlogs={response.data}
      initialMeta={response.meta}
    />
  );
}
