import Link from "next/link";

export default function Home() {
  return (
    <main style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px"}}>
      <h1 style={{fontSize: "24px", fontWeight: 600}}>OnlyVet Auth Demo</h1>
      <Link href="/login" style={{padding: "8px 16px", borderRadius: 12, background: "black", color: "white"}}>
        Перейти к авторизации
      </Link>
    </main>
  );
}
