"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowUpRight, Sparkles } from "lucide-react";

import { formatDate } from "@/lib/utils";
import {EmptyState} from "@/components/shared/empty-state";

interface Props {
  blogs: any[];
}

export function RecentBlogs({ blogs }: Props) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Recent blogs</CardTitle>

          <CardDescription>Latest posts</CardDescription>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/blogs">
            Manage
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {blogs?.length > 0 ? blogs?.map((blog) => (
            <div key={blog.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4" />

                <div>
                  <p className="font-medium">{blog.title}</p>

                  <p className="text-xs text-muted-foreground">
                    {formatDate(blog.publishedAt ?? blog.createdAt)}
                  </p>
                </div>
              </div>

              <Badge>{blog.status}</Badge>
            </div>
        )): <EmptyState className={"py-10"}/>}
      </CardContent>
    </Card>
  );
}
