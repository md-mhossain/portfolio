"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Eye, Pencil, Trash2, FileText } from "lucide-react";

import type { Blog } from "@/types";

type Props = {
  blog: Blog;
  onEdit: (blog: Blog) => void;
};

export function BlogActions({ blog, onEdit }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEdit(blog)}>
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/blogs/${blog.slug}`} target="_blank">
            <Eye className="h-4 w-4" />
            View
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive">
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
