import { FooterBrand } from './footer-brand';
import { FooterNavigation } from './footer-navigation';
import { FooterBottom } from './footer-bottom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterBrand className="lg:col-span-2" />
          <FooterNavigation />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
