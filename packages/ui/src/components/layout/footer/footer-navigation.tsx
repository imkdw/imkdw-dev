import Link from 'next/link';

interface Props {
  className?: string;
}

export function FooterNavigation({ className }: Props) {
  const footerLinks = {
    content: [
      { name: 'Latest Articles', href: '/articles' },
      { name: 'Latest Series', href: '/series' },
      // { name: 'All Tags', href: '/tags' },
    ],
    resources: [
      // { name: 'About', href: '/about' },
      // { name: 'RSS Feed', href: '/rss.xml' },
      { name: 'Sitemap', href: '/sitemap.xml' },
    ],
  };

  return (
    <>
      {/* Content Links */}
      <div className={className}>
        <h3 className="font-semibold mb-4">Content</h3>
        <ul className="space-y-3">
          {footerLinks.content.map(link => (
            <li key={link.name}>
              <Link href={link.href} className="text-muted-foreground hover:text-foreground smooth-transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources Links */}
      <div className={className}>
        <h3 className="font-semibold mb-4">Resources</h3>
        <ul className="space-y-3">
          {footerLinks.resources.map(link => (
            <li key={link.name}>
              <Link href={link.href} className="text-muted-foreground hover:text-foreground smooth-transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
