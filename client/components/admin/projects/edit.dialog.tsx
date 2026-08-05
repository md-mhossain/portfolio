'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    ProjectForm,
    type ProjectFormValues,
} from '@/components/admin/projects/project.form';

import type { Project } from '@/types';

interface Props {
    project: Project | null;
    open: boolean;
    submitting: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (
        values: ProjectFormValues
    ) => void;
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
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Project
                    </DialogTitle>

                    <DialogDescription>
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