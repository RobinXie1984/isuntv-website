/* oxlint-disable next/no-html-link-for-pages -- Error recovery uses native document navigation without loading the client router link shim. */
export default function NotFound() {
  return (
    <main style={{ padding: '5rem 6%', fontFamily: 'sans-serif' }}>
      <h1>找不到頁面 · Page not found</h1>
      <p>請返回節目目錄。Return to the programme collection.</p>
      <a href="/">陽光衛視 iSunTV →</a>
    </main>
  );
}
