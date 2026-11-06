type NavbarProps = {
  page: string
  setPage: (page: string) => void
}

function Navbar({ page, setPage }: NavbarProps) {
  return (
    <nav className="border-b border-gray-800 bg-[#11141b]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="text-2xl font-bold">
          CodeTrack
        </div>

        <div className="flex gap-8 text-sm">
          <button
            onClick={() => setPage("dashboard")}
            className={
              page === "dashboard"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("problems")}
            className={
              page === "problems"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Problems
          </button>

          <button
            onClick={() => setPage("progress")}
            className={
              page === "progress"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Progress
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar