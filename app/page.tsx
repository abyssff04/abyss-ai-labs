import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SampleEvaluation from '@/components/SampleEvaluation';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import FutureVision from '@/components/FutureVision';
import Trust from '@/components/Trust';
import Footer from '@/components/Footer';

/**
 * Main landing page — composes all section components.
 * Each section has its own id for smooth-scroll navigation.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fixed navigation */}
      <Navbar />

      {/* Page sections in order */}
      <Hero />
      <SampleEvaluation />
      <HowItWorks />
      <WhyChooseUs />
      <FutureVision />
      <Trust />
      <Footer />
    </main>
  );
}
