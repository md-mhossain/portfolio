export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ProjectStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export declare const BlogStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
export declare const MessageStatus: {
    readonly NEW: "NEW";
    readonly READ: "READ";
    readonly REPLIED: "REPLIED";
    readonly ARCHIVED: "ARCHIVED";
};
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
export declare const SkillCategory: {
    readonly FRONTEND: "FRONTEND";
    readonly BACKEND: "BACKEND";
    readonly DATABASE: "DATABASE";
    readonly DEVOPS: "DEVOPS";
    readonly TOOLS: "TOOLS";
    readonly OTHER: "OTHER";
};
export type SkillCategory = (typeof SkillCategory)[keyof typeof SkillCategory];
//# sourceMappingURL=enums.d.ts.map