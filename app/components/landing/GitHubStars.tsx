import { Github, Star } from 'lucide-react';
import Link from 'next/link';

async function getStars() {
  try {
    const res = await fetch('https://api.github.com/repos/Arjun544/flutter_init', {
      next: { 
        revalidate: 86400, // 24 hours
        tags: ['github-stars']
      }
    });
    
    if (!res.ok) return 0;
    
    const data = await res.json();
    return (data.stargazers_count as number) || 0;
  } catch (err) {
    console.error('Failed to fetch stars:', err);
    return 0;
  }
}

export async function GitHubStars() {
  const stars = await getStars();

  return (
    <Link
      href="https://github.com/Arjun544/flutter_init"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 h-14 px-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] hover:border-primary/30 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-300 sm:w-auto"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-zinc-50 group-hover:bg-primary/10 transition-colors duration-300">
          <Github className="w-5 h-5 text-zinc-900 group-hover:text-primary transition-colors duration-300" />
        </div>
        <span className="text-[1.05rem] font-semibold text-zinc-900 tracking-tight">
          Stars
        </span>
      </div>

      <div className="h-4 w-px bg-zinc-200 mx-1" />

      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
        <Star className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary fill-transparent group-hover:fill-primary/20 transition-all duration-300" />
        <span className="text-sm font-bold font-mono text-zinc-600 group-hover:text-primary transition-colors">
          {stars.toLocaleString()}
        </span>
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/2 transition-colors duration-300 -z-10" />
    </Link>
  );
}

export function GitHubStarsSkeleton() {
  return (
    <div className="flex items-center gap-3 h-14 px-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] w-full sm:w-auto animate-pulse">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-100" />
        <div className="w-12 h-5 bg-zinc-100 rounded" />
      </div>
      <div className="h-4 w-px bg-zinc-200 mx-1" />
      <div className="w-16 h-7 bg-zinc-50 border border-zinc-100 rounded-lg" />
    </div>
  );
}
