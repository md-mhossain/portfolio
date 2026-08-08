import type { Metadata } from "next";
import { AboutTeaser } from "@/components/home/about-teaser";
import { SkillsMarquee } from "@/components/home/skills.marquee";
import { WorkProcess } from "@/components/home/work-process";
import { PageHeader } from "@/components/shared/page-header";
import { serverListSkills } from "@/lib/api/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Monir Hossain, a full-stack developer specializing in Next.js, React, Node.js, and modern web technologies.",
};

export default async function AboutPage() {
  const { data: skills } = await serverListSkills({ limit: 50 });

  return (
    <>
      <PageHeader
        eyebrow="About Me"
        title="About Monir"
        description="A full-stack developer who loves turning complex problems into simple, beautiful, and intuitive products."
      />
      <AboutTeaser />
      <SkillsMarquee skills={skills} />
      <WorkProcess />
    </>
  );
}
