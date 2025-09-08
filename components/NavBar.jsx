import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link href="/" className="brand">Dylan Perrill</Link>
      <div>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
