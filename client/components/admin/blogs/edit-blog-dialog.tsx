"use client";

import type { Blog } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogForm } from "@/components/admin/blogs/blog-form";

type Props = {
  blog: Blog | null;
  onClose: () => void;
};

export function EditBlogDialog({ blog, onClose }: Props) {
  if (!blog) return null;

  return (
    <Dialog open={Boolean(blog)} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card/95 backdrop-blur-md border-border/80 shadow-2xl p-6">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Edit Blog
          </DialogTitle>
        </DialogHeader>

        <BlogForm
          initial={blog}
          submitLabel="Update Blog"
          onSubmit={(values) => {
            console.log(values);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
