import { BlogsClient } from "@/components/admin/blogs/blogs.client";
import {serverListBlogs} from "@/app/actions";

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
