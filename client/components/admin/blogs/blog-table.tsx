import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import type { Blog } from "@/types";
import { BlogActions } from "./blog-actions";

type Props = {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
};

export function BlogTable({ blogs, onEdit }: Props) {
  return (
    <table className="w-full">
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <div className="flex gap-3">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={80}
                  height={50}
                  className="rounded-lg object-cover"
                />

                <div>
                  <p>{blog.title}</p>
                  <p>{blog.readTime} min read</p>
                </div>
              </div>
            </td>

            <td>
              <Badge>{blog.category}</Badge>
            </td>

            <td>
              <Badge>{blog.status}</Badge>
            </td>

            <td>{formatDate(blog.publishedAt ?? blog.createdAt)}</td>

            <td>
              <BlogActions blog={blog} onEdit={onEdit} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
