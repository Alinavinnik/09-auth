import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
function Header() {
  return (
    <header className={css.header}>
      <Link className={css.navigationLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink}>
              Notes
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
