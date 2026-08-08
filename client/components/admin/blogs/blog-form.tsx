"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Blog, BlogStatus } from "@/types";

export interface BlogFormValues {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime?: number;
  status: BlogStatus;
}

export function toBlogFormValues(blog?: Blog): BlogFormValues {
  return {
    title: blog?.title ?? "",
    excerpt: blog?.excerpt ?? "",
    content: blog?.content ?? "",
    coverImage: blog?.coverImage ?? "",
    category: blog?.category ?? "",
    tags: blog?.tags ?? [],
    readTime: blog?.readTime,
    status: blog?.status ?? "PUBLISHED",
  };
}

interface BlogFormProps {
  initial?: Blog;
  submitting?: boolean;
  onSubmit: (values: BlogFormValues) => void;
  submitLabel: string;
}

export function BlogForm({
  initial,
  submitting,
  onSubmit,
  submitLabel,
}: BlogFormProps) {
  const [values, setValues] = useState<BlogFormValues>(() =>
    toBlogFormValues(initial),
  );
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !values.tags.includes(tag)) {
      setValues({ ...values, tags: [...values.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValues({ ...values, tags: values.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Title *
        </Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          placeholder="Blog title"
          required
          className="h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="coverImage"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Cover image URL *
          </Label>
          <Input
            id="coverImage"
            value={values.coverImage}
            onChange={(e) =>
              setValues({ ...values, coverImage: e.target.value })
            }
            placeholder="https://..."
            required
            className="h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Category *
          </Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            placeholder="React.js"
            required
            className="h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="excerpt"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Excerpt *
        </Label>
        <Textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
          placeholder="Short summary shown on cards"
          required
          className="rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all resize-none min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="content"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Content *
        </Label>
        <Textarea
          id="content"
          className="min-h-[220px] font-mono text-sm rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          placeholder={
            "Use markdown-style headings:\n## Section title\n\nParagraph text..."
          }
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="readTime"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Read time (minutes)
          </Label>
          <Input
            id="readTime"
            type="number"
            min={1}
            value={values.readTime ?? ""}
            onChange={(e) =>
              setValues({
                ...values,
                readTime: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="Auto-calculated if empty"
            className="h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Status
          </Label>
          <Select
            value={values.status}
            onValueChange={(value) =>
              setValues({ ...values, status: value as BlogStatus })
            }
          >
            <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border/80 focus:ring-1 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tags
        </Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Add a tag and press Enter"
            className="h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addTag}
            className="h-11 px-4 rounded-xl"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        {values.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {values.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="gap-1 px-3 py-1.5 rounded-lg text-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-0.5 hover:bg-muted transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11 rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 mt-4"
        disabled={submitting}
      >
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
