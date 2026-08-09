"use client";

import { useState } from "react";
import type { Blog } from "@/types";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";
import { BlogSearch } from "./blog.search";
import { BlogTable } from "./blog.table";
import { CreateBlogDialog } from "./create-blog-dialog";
import { EditBlogDialog } from "./edit-blog-dialog";
import type { BlogFormValues } from "@/components/admin/blogs/blog.form";

type Props = {
    initialBlogs: Blog[];
    initialMeta: any;
};

export function BlogsClient({ initialBlogs, initialMeta }: Props) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [meta, setMeta] = useState(initialMeta);

    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState<Blog | null>(null);
    const [creating, setCreating] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleCreateBlog = async (values: BlogFormValues) => {
        setSubmitting(true);
        try {
            // এখানে আপনার ব্লগ ক্রিয়েট করার API কল বা Server Action যুক্ত করবেন
            console.log("Creating blog:", values);

            // সফল হলে ডায়ালগ বন্ধ করে দিতে পারেন
            setCreating(false);
        } catch (error) {
            console.error("Failed to create blog", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between gap-4">
                <BlogSearch value={search} onChange={setSearch} />

                <Button onClick={() => setCreating(true)}>
                    <Plus className="h-4 w-4" />
                    New Post
                </Button>
            </div>

            <BlogTable blogs={blogs} onEdit={setEditing} />

            {meta && (
                <Pagination
                    meta={meta}
                    onPageChange={(page) => {
                        console.log(page);
                    }}
                />
            )}

            <CreateBlogDialog
                open={creating}
                onClose={() => setCreating(false)}
                submitting={submitting}
                onSubmit={handleCreateBlog}
            />

            <EditBlogDialog blog={editing} onClose={() => setEditing(null)} />
        </div>
    );
}