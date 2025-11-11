// app/page.tsx
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Advantages from '@/components/Advantages';
import Doctors from '@/components/Doctors';
import Reviews from '@/components/Reviews';
import Socials from '@/components/Socials';
import FAQ from '@/components/FAQ';
import FeedbackForm from '@/components/FeedbackForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Advantages />
      <Doctors />
      <Reviews />
      {/* Новый блок соцсетей на главной */}
      <Socials />
      <FAQ />
      <FeedbackForm />
    </>
  );
}
