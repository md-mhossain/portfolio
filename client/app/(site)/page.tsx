import { Hero } from '@/components/home/hero';
import { SkillsMarquee } from '@/components/home/skills-marquee';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { WorkProcess } from '@/components/home/work-process';
import { AboutTeaser } from '@/components/home/about-teaser';
import { BlogTeaser } from '@/components/home/blog-teaser';
import { ContactCta } from '@/components/home/contact-cta';
import { serverListBlogs, serverListProjects, serverListSkills } from '@/lib/api/server';

export const revalidate = 3600;

export default async function HomePage() {
  const [projectsResult, blogsResult, skillsResult] = await Promise.all([
    serverListProjects({ limit: 3, featured: 'true' }),
    serverListBlogs({ limit: 3 }),
    serverListSkills({ limit: 50 }),
  ]);

  return (
    <>
      <Hero />
      <SkillsMarquee skills={skillsResult.data} />
      <FeaturedProjects projects={projectsResult.data} />
      <WorkProcess />
      <AboutTeaser />
      <BlogTeaser blogs={blogsResult.data} />
      <ContactCta />
    </>
  );
}
