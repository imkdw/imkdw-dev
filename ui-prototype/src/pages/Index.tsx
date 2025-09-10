import Layout from '@/components/layout/Layout';
import DevTerminalSection from '@/components/home/DevTerminalSection';
import MainContent from '@/components/home/FeaturedSection';

const Index = () => {
  return (
    <Layout>
      <DevTerminalSection />
      <MainContent />
    </Layout>
  );
};

export default Index;
