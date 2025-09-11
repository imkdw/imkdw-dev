import { ThemeProvider } from 'next-themes';

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <a className="mr-6 flex items-center space-x-2" href="/design">
                <span className="font-bold">Design System</span>
              </a>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-6">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}