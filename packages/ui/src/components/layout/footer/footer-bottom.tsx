export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <p className="text-sm text-muted-foreground">© {currentYear} TechBlog. All rights reserved.</p>
    </div>
  );
}
