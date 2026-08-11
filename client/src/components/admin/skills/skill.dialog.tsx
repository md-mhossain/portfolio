"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card/95 backdrop-blur-md border-border/80 shadow-2xl p-6">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            {title}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
