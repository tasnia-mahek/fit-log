import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Logo */}
      <Link href="/" className="navbar-logo">
        <Image
          src="/images/fitlog-logo.png"
          alt="FitLog"
          width={112}
          height={32}
          priority
        />
      </Link>

     
      <nav className="navbar-links">
        <Link href="/" className="navbar-link active">
          Workouts
        </Link>

        <Link href="/my-plan" className="navbar-link">
          My Plan
        </Link>
      </nav>

     
      <div className="navbar-counters">
        <Link href="/my-plan" className="counter">
          <span>Plan</span>
          <span className="counter-number plan-number">0</span>
        </Link>

        <Link href="/my-plan" className="counter">
          <span>Saved</span>
          <span className="counter-number saved-number">0</span>
        </Link>
      </div>
    </header>
  );
}