import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Sparkles, Terminal, Cpu } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApiResponse, Project } from '@/types';
import {serverGetProject} from "@/app/actions";

export const revalidate = 3600;

interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const response: ApiResponse<Project> | null = await serverGetProject(slug);
    const project = response?.data;

    if (!project) return { title: 'Project not found' };

    return {
        title: project?.title,
        description: project?.description,
        openGraph: {
            title: project?.title,
            description: project?.description,
            images: [project?.image],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = await params;
    const response: ApiResponse<Project> | null = await serverGetProject(slug);
    const project = response?.data;

    if (!project) return notFound();

    return (
        <article className="relative min-h-screen pb-32 overflow-hidden bg-background">
            {/* Ambient Glow Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent blur-[120px] pointer-events-none -z-10" />

            <div className="container-page pt-12">
                {/* Back Navigation */}
                <Button asChild variant="ghost" size="sm" className="group -ml-3 mb-10 rounded-full px-4 border border-transparent hover:border-border/60 hover:bg-card/40 backdrop-blur-md transition-all">
                    <Link href="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
                        <span>Back to projects</span>
                    </Link>
                </Button>

                {/* Header Information */}
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-4 py-1.5 backdrop-blur-xl shadow-xs mb-8">
                        <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                        <span className="text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            Case Study & Showcase
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground/70 bg-clip-text text-transparent">
                        {project?.title}
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-normal">
                        {project?.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        {project?.liveUrl && (
                            <Button asChild size="lg" className="rounded-2xl px-7 h-12 shadow-xl shadow-accent/20 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-95">
                                <Link href={project?.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium">
                                    <ExternalLink className="h-4 w-4" />
                                    <span>Live Preview</span>
                                </Link>
                            </Button>
                        )}
                        {project?.repoUrl && (
                            <Button asChild variant="outline" size="lg" className="rounded-2xl px-7 h-12 border-border/80 bg-card/40 hover:bg-card/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-95">
                                <Link href={project?.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium">
                                    <FaGithub className="h-4 w-4" />
                                    <span>Source Code</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Hero Feature Image */}
                <div className="mt-16 group relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/40 shadow-2xl backdrop-blur-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none" />
                    <Image
                        src={project?.image}
                        alt={project?.title}
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Content Body & Overview */}
                <div className="mx-auto max-w-3xl mt-16 space-y-12">
                    <div className="relative rounded-[2rem] border border-border/60 bg-card/30 p-8 sm:p-10 backdrop-blur-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-card/80 text-accent shadow-xs">
                                <Terminal className="h-5 w-5" />
                            </div>
                            <h2 className="font-display text-2xl font-bold tracking-tight">Overview</h2>
                        </div>

                        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>{project?.longDescription}</p>
                        </div>
                    </div>

                    {/* Tech Stack / Tags */}
                    {project?.tags && project?.tags.length > 0 && (
                        <div className="rounded-[2rem] border border-border/60 bg-card/20 p-8 sm:p-10 backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-card/80 text-accent shadow-xs">
                                    <Cpu className="h-5 w-5" />
                                </div>
                                <h3 className="font-display text-xl font-bold tracking-tight">Technologies & Stack</h3>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {project?.tags?.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="rounded-xl px-4 py-2 text-sm font-medium border border-border/40 bg-card/50 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}