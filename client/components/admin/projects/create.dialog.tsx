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

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submitting: boolean;
    onSubmit: (
        values: ProjectFormValues
    ) => void;
}

export function CreateProjectDialog({
                                        open,
                                        onOpenChange,
                                        submitting,
                                        onSubmit,
                                    }: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>

                    <DialogDescription>
                        Add a new project.
                    </DialogDescription>
                </DialogHeader>

                <ProjectForm
                    submitting={submitting}
                    submitLabel="Create Project"
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}