"use client";

import Image from "next/image";

import { FileText } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import { BlogActions } from "./blog.actions";
import type { Blog } from "@/types";

type Props = {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
};

const statusVariant = {
  PUBLISHED: "success",
  DRAFT: "warning",
  ARCHIVED: "secondary",
} as const;

export function BlogTable({ blogs, onEdit }: Props) {
  return (
    <div className="rounded-2xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Blog</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <div className="flex gap-3 items-center">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={56}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                    className=" h-[40px] w-[56px]rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {blog.readTime} min read
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="outline">{blog.category}</Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    statusVariant[blog.status as keyof typeof statusVariant] ??
                    "default"
                  }
                >
                  {blog.status}
                </Badge>
              </TableCell>

              <TableCell>
                {formatDate(blog.publishedAt ?? blog.createdAt)}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <BlogActions blog={blog} onEdit={onEdit} onDelete={function (blog: Blog): void {
                      throw new Error("Function not implemented.");
                    }} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
