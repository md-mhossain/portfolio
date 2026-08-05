import { blogsApi } from "@/lib/api/blogs";
import { AdminBlogsClient } from "@/components/admin/blogs/admin-blogs-client";

export default async function AdminBlogsPage() {
  const response = await blogsApi.listAdmin({
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
