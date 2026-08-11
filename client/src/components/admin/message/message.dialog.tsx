"use client";

import { CheckCheck } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/utils";

import type { Message } from "@/types";

type Props = {
    message: Message | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReply: () => void;
    onArchive: () => void;
};

export function MessageDetailsDialog({
                                         message,
                                         open,
                                         onOpenChange,
                                         onReply,
                                         onArchive,
                                     }: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {message?.subject || "Message"}
                    </DialogTitle>

                    <DialogDescription>
                        From {message?.name}
                        {" ("}
                        {message?.email}
                        {")"}
                        {" · "}
                        {message &&
                            formatDate(message.createdAt)}
                    </DialogDescription>
                </DialogHeader>

                <div className="whitespace-pre-wrap rounded-xl bg-muted p-4">
                    {message?.body}
                </div>

                <DialogFooter>
                    <Button
                        onClick={onReply}
                        disabled={
                            message?.status === "REPLIED"
                        }
                    >
                        <CheckCheck className="h-4 w-4" />
                        Mark as replied
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onArchive}
                    >
                        Archive
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}