'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface SkillDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

export function SkillDialog({
                                open,
                                onOpenChange,
                                title,
                                description,
                                children,
                            }: SkillDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}