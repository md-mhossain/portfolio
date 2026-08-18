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
  onDelete: (id: string) => void;
  loading?: boolean;
};

const statusVariant = {
  PUBLISHED: "success",
  DRAFT: "warning",
  ARCHIVED: "secondary",
} as const;

export function BlogTable({
                            blogs,
                            onEdit,
                            onDelete,
                            loading = false,
                          }: Props) {
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
                    <div className="flex items-center gap-3">
                      <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          width={56}
                          height={40}
                          className="h-[40px] w-[56px] rounded-lg object-cover"
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
                    <Badge variant="outline">
                      {blog.category}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                        variant={
                            statusVariant[
                                blog.status as keyof typeof statusVariant
                                ] ?? "default"
                        }
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {formatDate(
                        blog.publishedAt ?? blog.createdAt
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={loading}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                          <BlogActions
                              blog={blog}
                              onEdit={() => onEdit(blog)}
                              onDelete={() => onDelete(blog.id)}
                              loading={loading}
                          />
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