"use client";

import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";

import type { Blog } from "@/types";

type Props = {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
};

export function BlogActions({ blog, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        onClick={() => {
          setOpen(false);
          onEdit(blog);
        }}
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link
          href={`/blogs/${blog.slug}`}
          target="_blank"
          onClick={() => setOpen(false)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        onClick={() => {
          setOpen(false);
          onDelete(blog);
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
