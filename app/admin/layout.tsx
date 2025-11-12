// app/admin/layout.tsx
export const metadata = { title: 'Админка — OnlyVet' };
export default function AdminLayout({ children }:{ children: React.ReactNode }){
  return <section className="container py-6">{children}</section>;
}
