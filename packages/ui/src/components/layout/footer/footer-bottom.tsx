export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <p className="text-sm text-muted-foreground">© {currentYear} TechBlog. All rights reserved.</p>
    </div>
  );
}
