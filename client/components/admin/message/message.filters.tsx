"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type MessageFiltersProps = {
    search: string;
    status: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
};

export function MessageFilters({
                                   search,
                                   status,
                                   onSearchChange,
                                   onStatusChange,
                               }: MessageFiltersProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    value={search}
                    placeholder="Search messages..."
                    className="pl-9"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <Select
                value={status}
                onValueChange={onStatusChange}
            >
                <SelectTrigger className="w-36">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="READ">Read</SelectItem>
                    <SelectItem value="REPLIED">Replied</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}