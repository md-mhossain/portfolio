'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Blog, BlogStatus } from '@/types';

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
    title: blog?.title ?? '',
    excerpt: blog?.excerpt ?? '',
    content: blog?.content ?? '',
    coverImage: blog?.coverImage ?? '',
    category: blog?.category ?? '',
    tags: blog?.tags ?? [],
    readTime: blog?.readTime,
    status: blog?.status ?? 'PUBLISHED',
  };
}

interface BlogFormProps {
  initial?: Blog;
  submitting?: boolean;
  onSubmit: (values: BlogFormValues) => void;
  submitLabel: string;
}

export function BlogForm({ initial, submitting, onSubmit, submitLabel }: BlogFormProps) {
  const [values, setValues] = useState<BlogFormValues>(() => toBlogFormValues(initial));
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !values.tags.includes(tag)) {
      setValues({ ...values, tags: [...values.tags, tag] });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setValues({ ...values, tags: values.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          placeholder="Blog title"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover image URL *</Label>
          <Input
            id="coverImage"
            value={values.coverImage}
            onChange={(e) => setValues({ ...values, coverImage: e.target.value })}
            placeholder="https://..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            placeholder="React.js"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
          placeholder="Short summary shown on cards"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          className="min-h-[220px] font-mono text-sm"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          placeholder={'Use markdown-style headings:\n## Section title\n\nParagraph text...'}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="readTime">Read time (minutes)</Label>
          <Input
            id="readTime"
            type="number"
            min={1}
            value={values.readTime ?? ''}
            onChange={(e) =>
              setValues({ ...values, readTime: e.target.value ? Number(e.target.value) : undefined })
            }
            placeholder="Auto-calculated if empty"
          />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={values.status}
            onValueChange={(value) => setValues({ ...values, status: value as BlogStatus })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Add a tag and press Enter"
          />
          <Button type="button" variant="outline" onClick={addTag}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        {values.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {values.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
