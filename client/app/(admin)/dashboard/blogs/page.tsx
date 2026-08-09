import { BlogsClient } from "@/components/admin/blogs/blogs.client";
import { serverListBlogs } from "@/lib/api/server";

export default async function AdminBlogsPage() {
  const response = await serverListBlogs({
    page: 1,
    limit: 10,
    search: "",
  });

  return (
    <BlogsClient
      initialBlogs={response.data}
      initialMeta={response.meta}
    />
  );
}
