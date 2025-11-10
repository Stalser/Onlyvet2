import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import Doctors from '@/components/Doctors';
import FAQ from '@/components/FAQ';
import FeedbackForm from '@/components/FeedbackForm';

export default function HomePage() {
  return (<>
    <Hero />
    <Advantages />
    <Doctors />
    <FAQ />
    <FeedbackForm />
  </>);
}
