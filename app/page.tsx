// app/page.tsx
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import Doctors from '@/components/Doctors';
import Services from '@/components/Services';      // блок услуг (вкладки)
import Reviews from '@/components/Reviews';
import Socials from '@/components/Socials';        // блок соцсетей (если он уже есть у вас — оставьте свой)
import FAQ from '@/components/FAQ';
import FeedbackForm from '@/components/FeedbackForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Advantages />
      <Doctors />
      <Services />      {/* ← новый сгруппированный блок */}
      <Reviews />
      <Socials />       {/* ← блок соцсетей на главной */}
      <FAQ />
      <FeedbackForm />
    </>
  );
}
