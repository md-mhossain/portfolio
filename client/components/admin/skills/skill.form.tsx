'use client';

import { Loader2 } from 'lucide-react';
import type {SkillCategory, SkillFormValues} from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const categories: SkillCategory[] = [
    'FRONTEND',
    'BACKEND',
    'DATABASE',
    'DEVOPS',
    'TOOLS',
    'OTHER',
];

interface SkillFormProps {
    values: SkillFormValues;
    onChange: (values: SkillFormValues) => void;
    onSubmit: () => void;
    loading: boolean;
    submitLabel: string;
}

export function SkillForm({
                              values,
                              onChange,
                              onSubmit,
                              loading,
                              submitLabel,
                          }: SkillFormProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Label>Name</Label>

                <Input
                    value={values.name}
                    onChange={(e) =>
                        onChange({
                            ...values,
                            name: e.target.value,
                        })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label>Icon URL</Label>

                <Input
                    value={values.iconUrl}
                    onChange={(e) =>
                        onChange({
                            ...values,
                            iconUrl: e.target.value,
                        })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label>Description</Label>

                <Textarea
                    value={values.description}
                    onChange={(e) =>
                        onChange({
                            ...values,
                            description: e.target.value,
                        })
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Category</Label>

                    <Select
                        value={values.category}
                        onValueChange={(value) =>
                            onChange({
                                ...values,
                                category: value as SkillCategory,
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Proficiency</Label>

                    <Input
                        type="number"
                        min={0}
                        max={100}
                        value={values.proficiency}
                        onChange={(e) =>
                            onChange({
                                ...values,
                                proficiency: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </div>

            <div>
                <Label>Order</Label>

                <Input
                    type="number"
                    value={values.order}
                    onChange={(e) =>
                        onChange({
                            ...values,
                            order: Number(e.target.value),
                        })
                    }
                />
            </div>

            <Button
                className="w-full"
                onClick={onSubmit}
                disabled={loading}
            >
                {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {submitLabel}
            </Button>
        </div>
    );
}