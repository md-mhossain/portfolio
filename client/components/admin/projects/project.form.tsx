'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Project, ProjectStatus } from '@/types';

export interface ProjectFormValues {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  repoUrl: string;
  liveUrl: string;
  tags: string[];
  featured: boolean;
  status: ProjectStatus;
  order: number;
}

export function toFormValues(project?: Project): ProjectFormValues {
  return {
    title: project?.title ?? '',
    description: project?.description ?? '',
    longDescription: project?.longDescription ?? '',
    image: project?.image ?? '',
    repoUrl: project?.repoUrl ?? '',
    liveUrl: project?.liveUrl ?? '',
    tags: project?.tags ?? [],
    featured: project?.featured ?? false,
    status: project?.status ?? 'PUBLISHED',
    order: project?.order ?? 0,
  };
}

interface ProjectFormProps {
  initial?: Project;
  submitting: boolean;
  onSubmit: (values: ProjectFormValues) => void;
  submitLabel: string;
}

export function ProjectForm({ initial, submitting, onSubmit, submitLabel }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(() => toFormValues(initial));
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Project title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL *</Label>
          <Input
            id="image"
            value={values.image}
            onChange={(e) => setValues({ ...values, image: e.target.value })}
            placeholder="https://..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            value={values.order}
            onChange={(e) => setValues({ ...values, order: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            value={values.liveUrl}
            onChange={(e) => setValues({ ...values, liveUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input
            id="repoUrl"
            value={values.repoUrl}
            onChange={(e) => setValues({ ...values, repoUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            placeholder="Short project description"
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="longDescription">Long description</Label>
          <Textarea
            id="longDescription"
            className="min-h-[120px]"
            value={values.longDescription}
            onChange={(e) => setValues({ ...values, longDescription: e.target.value })}
            placeholder="Optional extended description"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
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

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={values.status}
            onValueChange={(value) => setValues({ ...values, status: value as ProjectStatus })}
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

        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="text-sm font-medium">Featured</p>
            <p className="text-xs text-muted-foreground">Show in featured section</p>
          </div>
          <Switch
            checked={values.featured}
            onCheckedChange={(checked) => setValues({ ...values, featured: checked })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
