'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

import { getErrorMessage } from '@/lib/api/client';
import {settingsApi} from "@/lib/api";

export interface StepItem {
    title: string;
    description: string;
}

export interface SettingsFormValues {
    siteTitle: string;
    siteDescription: string;
    heroTitle: string;
    heroDescription: string;
    githubUrl: string;
    linkedinUrl: string;
    facebookUrl: string;
    email: string;
    phone: string;
    steps: StepItem[];
}

interface SettingsFormProps {
    initialData?: SettingsFormValues;
}

export function SettingsForm({
                                 initialData,
                             }: SettingsFormProps) {
    const [steps, setSteps] = useState<StepItem[]>(
        initialData?.steps || []
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SettingsFormValues>({
        defaultValues: {
            siteTitle: initialData?.siteTitle || '',
            siteDescription:
                initialData?.siteDescription || '',
            heroTitle: initialData?.heroTitle || '',
            heroDescription:
                initialData?.heroDescription || '',
            githubUrl: initialData?.githubUrl || '',
            linkedinUrl:
                initialData?.linkedinUrl || '',
            facebookUrl:
                initialData?.facebookUrl || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
        },
    });


    const saveSettings = async (values: SettingsFormValues) => {
        const payload = {
            ...values,
            steps,
        };

        await Promise.all(
            Object.entries(payload).map(([key, value]) =>
                settingsApi.upsert(key, value)
            )
        );
    };

    const updateMutation = useMutation({
        mutationFn: saveSettings,

        onSuccess: () => {
            toast.success('Settings updated');
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (data: SettingsFormValues) => {
        updateMutation.mutate(data);
    };

    const addStep = () => {
        setSteps([
            ...steps,
            {
                title: '',
                description: '',
            },
        ]);
    };

    const removeStep = (index: number) => {
        setSteps(
            steps.filter((_, i) => i !== index)
        );
    };

    const updateStep = (
        index: number,
        field: keyof StepItem,
        value: string
    ) => {
        const updated = [...steps];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setSteps(updated);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <Input
                        placeholder="Site Title"
                        {...register('siteTitle')}
                    />

                    <Textarea
                        placeholder="Site Description"
                        {...register('siteDescription')}
                    />

                    <Input
                        placeholder="Hero Title"
                        {...register('heroTitle')}
                    />

                    <Textarea
                        placeholder="Hero Description"
                        {...register('heroDescription')}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4 pt-6">
                    <Input
                        placeholder="GitHub URL"
                        {...register('githubUrl')}
                    />

                    <Input
                        placeholder="LinkedIn URL"
                        {...register('linkedinUrl')}
                    />

                    <Input
                        placeholder="Facebook URL"
                        {...register('facebookUrl')}
                    />

                    <Input
                        placeholder="Email"
                        {...register('email')}
                    />

                    <Input
                        placeholder="Phone"
                        {...register('phone')}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                            Process Steps
                        </h3>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addStep}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Step
                        </Button>
                    </div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="rounded-lg border p-4 space-y-3"
                        >
                            <Input
                                value={step.title}
                                placeholder="Step Title"
                                onChange={(e) =>
                                    updateStep(
                                        index,
                                        'title',
                                        e.target.value
                                    )
                                }
                            />

                            <Textarea
                                value={step.description}
                                placeholder="Description"
                                onChange={(e) =>
                                    updateStep(
                                        index,
                                        'description',
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                    removeStep(index)
                                }
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Button
                type="submit"
                disabled={updateMutation.isPending}
            >
                {updateMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Save Settings
            </Button>
        </form>
    );
}