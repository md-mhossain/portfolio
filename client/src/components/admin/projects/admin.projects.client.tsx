'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectsApi } from '@/lib/api/projects';
import { getErrorMessage } from '@/lib/api/client';



import type { Project } from '@/types';
import type { ProjectFormValues } from '@/components/admin/projects/project.form';
import {ProjectsTable} from "@/components/admin/projects/projects.table";
import {CreateProjectDialog} from "@/components/admin/projects/create.dialog";
import {EditProjectDialog} from "@/components/admin/projects/edit.dialog";

interface Props {
    initialData: any;
    page: number;
    search: string;
}

export function AdminProjectsClient({
                                   initialData,
                               }: Props) {
    const queryClient = useQueryClient();

    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ['projects'],
        });
    };

    const createMutation = useMutation({
        mutationFn: (payload: ProjectFormValues) =>
            projectsApi.create(payload),

        onSuccess: () => {
            toast.success('Project created');
            invalidate();
            setCreating(false);
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
                         id,
                         payload,
                     }: {
            id: string;
            payload: ProjectFormValues;
        }) => projectsApi.update(id, payload),

        onSuccess: () => {
            toast.success('Project updated');
            invalidate();
            setEditing(null);
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            projectsApi.delete(id),

        onSuccess: () => {
            toast.success('Project deleted');
            invalidate();
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    return (
        <>
            <ProjectsTable
                data={initialData}
                onCreate={() => setCreating(true)}
                onEdit={setEditing}
                onDelete={(id) =>
                    deleteMutation.mutate(id)
                }
            />

            <CreateProjectDialog
                open={creating}
                onOpenChange={setCreating}
                submitting={createMutation.isPending}
                onSubmit={(values) =>
                    createMutation.mutate(values)
                }
            />

            <EditProjectDialog
                project={editing}
                open={Boolean(editing)}
                submitting={updateMutation.isPending}
                onOpenChange={(open) => {
                    if (!open) setEditing(null);
                }}
                onSubmit={(values) => {
                    if (!editing) return;

                    updateMutation.mutate({
                        id: editing.id,
                        payload: values,
                    });
                }}
            />
        </>
    );
}