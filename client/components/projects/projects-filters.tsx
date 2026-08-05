'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectsFiltersProps {
  initialSearch?: string;
  initialFilter?: 'all' | 'featured';
}

export function ProjectsFilters({ initialSearch = '', initialFilter = 'all' }: ProjectsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) params.set('search', search.trim());
      else params.delete('search');
      params.delete('page');
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, pathname, router, searchParams]);

  const setFilter = (value: 'all' | 'featured') => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'featured') params.set('featured', 'true');
    else params.delete('featured');
    params.delete('page');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <Tabs value={initialFilter} onValueChange={(value) => setFilter(value as 'all' | 'featured')}>
        <TabsList>
          <TabsTrigger value="all">All projects</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="pl-9"
          aria-label="Search projects"
        />
      </div>
    </div>
  );
}
