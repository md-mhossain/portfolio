"use server";


import {cookies} from "next/headers";

import type {
    ApiResponse,
    Blog,
    PaginationMeta,
    Project,
    Skill, User,
} from "@/types";

import {
    CACHE_TAGS,
    REVALIDATE_PUBLIC,
    REVALIDATE_SETTINGS,
} from "@/lib/cache";
import {buildQuery, ProjectListParams} from "@/lib/api/projects";
import {BlogListParams} from "@/lib/api/blogs";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

interface ServerFetchOptions {
    revalidate?: number | false;
    tags?: string[];
}

export interface PaginatedResult<T> {
    data: T[];
    meta?: PaginationMeta;
}

/**
 * Public fetch with ISR support
 */
async function serverFetchRaw<T>(
    path: string,
    options: ServerFetchOptions = {},
): Promise<ApiResponse<T> | null> {
    const revalidate = options.revalidate ?? REVALIDATE_PUBLIC;

    try {
        const res = await fetch(`${API_BASE}/api/v1${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...(revalidate === false
                ? {
                    cache: "no-store",
                }
                : {
                    next: {
                        revalidate,
                        tags: options.tags,
                    },
                }),
        });

        if (!res.ok) {
            return null;
        }

        return (await res.json()) as ApiResponse<T>;
    } catch {
        return null;
    }
}

export async function serverFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<T> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const cookieHeader = [
        accessToken && `accessToken=${accessToken}`,
        refreshToken && `refreshToken=${refreshToken}`,
    ]
        .filter(Boolean)
        .join("; ");

    let res = await fetch(`${API_BASE}/api/v1${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
            ...(init?.headers ?? {}),
        },
        cache: "no-store",
    });

    if (res.status === 401 && refreshToken) {
        const refreshRes = await fetch(
            `${API_BASE}/api/v1/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Cookie: cookieHeader,
                },
                cache: "no-store",
            },
        );

        if (refreshRes.ok) {
            res = await fetch(`${API_BASE}/api/v1${path}`, {
                ...init,
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieHeader,
                    ...(init?.headers ?? {}),
                },
                cache: "no-store",
            });
        }
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const payload = await res.json();

    return payload;
}

/* =========================
   PROJECTS
========================= */

export async function serverListProjects(
    params: ProjectListParams = {},
): Promise<PaginatedResult<Project>> {
    const payload = await serverFetchRaw<Project[]>(
        buildQuery("/projects", params),
        {
            tags: [CACHE_TAGS.projects],
        },
    );

    return {
        data: payload?.data ?? [],
        meta: payload?.meta,
    };
}

export async function serverGetProject(slug: string) {
    return serverFetchRaw<Project>(`/projects/${slug}`, {
        tags: [CACHE_TAGS.projects],
    });
}




/* =========================
   BLOGS
========================= */

export async function serverListBlogs(
    params: BlogListParams = {},
): Promise<PaginatedResult<Blog>> {
    const payload = await serverFetchRaw<Blog[]>(buildQuery("/blogs", params), {
        tags: [CACHE_TAGS.blogs],
    });

    return {
        data: payload?.data ?? [],
        meta: payload?.meta,
    };
}

export async function serverGetBlog(slug: string) {
    return serverFetchRaw<Blog>(`/blogs/${slug}`, {
        tags: [CACHE_TAGS.blogs],
    });
}

/* =========================
   SKILLS
========================= */

export async function serverListSkills(
    params: {
        page?: number;
        limit?: number;
    } = {},
): Promise<PaginatedResult<Skill>> {
    const payload = await serverFetchRaw<Skill[]>(buildQuery("/skills", params), {
        tags: [CACHE_TAGS.skills],
    });

    return {
        data: payload?.data ?? [],
        meta: payload?.meta,
    };
}

/* =========================
   SETTINGS
========================= */

export async function serverGetSettings(keys?: string) {
    const path = keys ? buildQuery("/settings", {keys}) : "/settings";

    return serverFetchRaw<Record<string, unknown>>(path, {
        revalidate: REVALIDATE_SETTINGS,
        tags: [CACHE_TAGS.settings],
    });
}

export async function getMe() {
    const response: ApiResponse<User> = await serverFetch("/auth/me");
    return response?.data
}
