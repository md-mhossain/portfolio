import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serverGetSettings } from '@/lib/api/server';
import { Button } from '@/components/ui/button';

export async function Hero() {
  const settings = await serverGetSettings('hero');
  const hero = settings?.hero as { title?: string; subtitle?: string } | undefined;

  const title = hero?.title ?? 'Trusted Partner for Your Website Develop.';
  const subtitle =
    hero?.subtitle ??
    "Building the world's best marketing websites for over a decade. Your trusted partner for strategy, design, and dev.";

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-30">
        <img src="/images/bg-gradiant1.svg" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container-page">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[84px]">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href="/projects">
                Show my work
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Let&apos;s talk</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
