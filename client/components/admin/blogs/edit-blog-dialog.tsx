"use client";

import type { Blog } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {BlogForm} from "@/components/admin/blogs/blog-form";


type Props = {
  blog: Blog | null;
  onClose: () => void;
};

export function EditBlogDialog({ blog, onClose }: Props) {
  if (!blog) return null;

  return (
    <Dialog open={Boolean(blog)} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>

        <BlogForm
          initial={blog}
          submitLabel="Update"
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
