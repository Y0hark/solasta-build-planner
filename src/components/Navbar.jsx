import { Link, NavLink } from 'react-router-dom'

const lienBase =
  'relative whitespace-nowrap py-1 text-[0.65rem] uppercase tracking-[0.18em] text-gray-300 transition-colors hover:text-or-100 sm:text-xs sm:tracking-[0.24em] ' +
  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 ' +
  'after:bg-or-300 after:transition-transform after:duration-300 hover:after:scale-x-100'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-or-700/25 bg-encre/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="group flex items-center gap-3">
          {/* Sceau de couverture : trois pierres pour trois builds */}
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-or-500/50 text-or-300 transition-colors duration-300 group-hover:border-or-300 group-hover:text-or-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <circle cx="12" cy="5" r="2.4" />
              <circle cx="5.6" cy="16" r="2.4" />
              <circle cx="18.4" cy="16" r="2.4" />
            </svg>
          </span>
          {/* Sous 640px le sceau seul tient lieu de logo : la barre ne déborde plus */}
          <span className="grave hidden text-sm leading-none tracking-[0.2em] sm:block sm:text-base">
            Solasta Build Planner
          </span>
        </Link>

        <ul className="flex items-center gap-5 sm:gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${lienBase} ${isActive ? 'text-or-100 after:scale-x-100' : ''}`
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `${lienBase} ${isActive ? 'text-or-100 after:scale-x-100' : ''}`
              }
            >
              Comparer
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
