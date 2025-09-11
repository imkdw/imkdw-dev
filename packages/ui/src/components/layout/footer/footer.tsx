import { FooterBrand } from './footer-brand';
import { FooterNavigation } from './footer-navigation';
import { FooterBottom } from './footer-bottom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <FooterBrand className="lg:col-span-2" />

          {/* Navigation Sections */}
          <FooterNavigation />
        </div>

        {/* Bottom Bar */}
        <FooterBottom className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" />
      </div>
    </footer>
  );
}
