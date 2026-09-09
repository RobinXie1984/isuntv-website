import Link from 'next/link';
export default function NotFound() {
  return (
    <main style={{ padding: '5rem 6%', fontFamily: 'sans-serif' }}>
      <h1>找不到頁面 · Page not found</h1>
      <p>請返回節目目錄。Return to the programme collection.</p>
      <Link href="/">陽光衛視 iSunTV →</Link>
    </main>
  );
}
