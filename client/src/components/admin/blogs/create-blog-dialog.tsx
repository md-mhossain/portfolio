"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BlogForm,
  type BlogFormValues,
} from "@/components/admin/blogs/blog.form";

type Props = {
  open: boolean;
  onClose: () => void;
  submitting?: boolean;
  onSubmit: (values: BlogFormValues) => void;
};

export function CreateBlogDialog({
  open,
  onClose,
  submitting,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader className="px-6 py-4 border-b border-border/50 bg-card/50">
          <DialogTitle className="font-display text-xl font-bold tracking-tight">
            Create Blog
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Add a new blog post to your collection.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <BlogForm
            submitting={submitting}
            submitLabel="Create Blog"
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
