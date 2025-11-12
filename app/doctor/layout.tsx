// app/doctor/layout.tsx
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';

export const metadata = { title: 'Панель врача — OnlyVet' };

export default function DoctorLayout({ children }:{ children: React.ReactNode }){
  return (
    <section className="container py-4 sm:py-6">
      <Topbar />
      <div className="mt-4 flex gap-4">
        <Sidebar />
        <main className="grow">{children}</main>
      </div>
    </section>
  );
}
