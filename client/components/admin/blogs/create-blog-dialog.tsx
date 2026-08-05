"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {BlogForm} from "@/components/admin/blogs/blog-form";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateBlogDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Blog</DialogTitle>
        </DialogHeader>

        <BlogForm
          submitLabel="Create"
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
