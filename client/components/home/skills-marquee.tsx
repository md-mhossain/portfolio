'use client';

import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

interface SkillCardProps {
  name: string;
  description: string;
  iconUrl: string;
  proficiency: number;
}

function SkillCard({ name, description, iconUrl, proficiency }: SkillCardProps) {
  return (
    <div className="group flex w-[260px] shrink-0 flex-col gap-3 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <img
          src={iconUrl}
          alt={name}
          loading="lazy"
          className="h-10 w-10 rounded-xl bg-muted p-1.5 object-contain"
        />
        <span className="text-xs font-semibold text-muted-foreground">{proficiency}%</span>
      </div>
      <h3 className="font-display text-xl font-bold">{name}</h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

interface SkillsMarqueeProps {
  skills: Skill[];
}

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  return (
    <section className="overflow-hidden rounded-[40px] bg-black py-20 text-white dark:bg-gray-900">
      <div className="container-page">
        <div className="mb-12 space-y-4 text-white">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-accent" />
            Why Choose me
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            My Extensive List of Skills
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
            Building the world&apos;s best marketing websites for over a decade. Your trusted partner
            for strategy, design, and dev.
          </p>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="px-6 text-center text-gray-400">Skills could not be loaded right now.</div>
      ) : (
        <div className="relative">
          <div
            className={cn('flex gap-5 px-6')}
            style={{
              animation: 'scroll var(--duration, 40s) linear infinite',
              ['--duration' as string]: `${Math.max(24, skills.length * 4)}s`,
              width: 'max-content',
            }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <SkillCard
                key={`${skill.id}-${index}`}
                name={skill.name}
                description={skill.description}
                iconUrl={skill.iconUrl}
                proficiency={skill.proficiency}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
