import { Code2, Github, Twitter, Mail } from 'lucide-react';

interface Props {
  className?: string;
}

export function FooterBrand({ className }: Props) {
  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: '#', icon: Mail },
  ];

  return (
    <div className={className}>
      <div className="flex items-center space-x-2 mb-4">
        <Code2 className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold tracking-tight">TechBlog</span>
      </div>
      <p className="text-muted-foreground mb-6 max-w-md">
        A modern tech blog focused on web development, programming tutorials, and the latest in technology.
        Written by developers, for developers.
      </p>

      <div className="flex space-x-4">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="text-muted-foreground hover:text-primary smooth-transition"
            aria-label={link.name}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}