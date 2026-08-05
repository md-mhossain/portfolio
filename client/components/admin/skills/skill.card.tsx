'use client';

import Image from 'next/image';
import type { Skill } from '@/types';

import { Badge } from '@/components/ui/badge';
import { SkillActions } from './skill.actions';

interface SkillCardProps {
    skill: Skill;
    onEdit: (skill: Skill) => void;
    onDelete: (id: string) => void;
}

export function SkillCard({
                              skill,
                              onEdit,
                              onDelete,
                          }: SkillCardProps) {
    return (
        <div className="group rounded-2xl border p-5">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Image
                        src={skill.iconUrl}
                        alt={skill.name}
                        width={40}
                        height={40}
                    />

                    <div>
                        <p className="font-medium">
                            {skill.name}
                        </p>

                        <Badge variant="secondary">
                            {skill.category}
                        </Badge>
                    </div>
                </div>

                <SkillActions
                    skill={skill}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
}