import { BlogInfoProps } from './types';

export function BlogInfo({ title, description }: BlogInfoProps) {
  return (
    <div>
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
        <span className="text-blue-500">const</span> <span className="text-primary">@imkdw-dev/blog</span>{' '}
        <span className="text-muted-foreground">=</span>{' '}
        <span className="text-amber-500">"{title.split('"')[1] || title}"</span>
      </h1>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  );
}