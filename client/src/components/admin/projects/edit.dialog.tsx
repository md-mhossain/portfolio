"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ProjectForm,
  type ProjectFormValues,
} from "@/components/admin/projects/project.form";

import type { Project } from "@/types";

interface Props {
  project: Project | null;
  open: boolean;
  submitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProjectFormValues) => void;
}

export function EditProjectDialog({
  project,
  open,
  submitting,
  onOpenChange,
  onSubmit,
}: Props) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card/95 backdrop-blur-md border-border/80 shadow-2xl p-6">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Edit Project
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground">
            Update project details.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          initial={project}
          submitting={submitting}
          submitLabel="Save Changes"
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
