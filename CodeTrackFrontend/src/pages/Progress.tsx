import { useEffect, useState } from "react"

type ProgressData = {
  total: number
  solved: number
  remaining: number
  percentage: number

  easySolved: number
  easyTotal: number

  mediumSolved: number
  mediumTotal: number

  hardSolved: number
  hardTotal: number
}

function Progress() {
  const [progress, setProgress] = useState<ProgressData>({
    total: 0,
    solved: 0,
    remaining: 0,
    percentage: 0,

    easySolved: 0,
    easyTotal: 0,

    mediumSolved: 0,
    mediumTotal: 0,

    hardSolved: 0,
    hardTotal: 0,
  })

  useEffect(() => {
    fetch("http://localhost:8080/api/problems/progress")
      .then((response) => response.json())
      .then((data) => {
        setProgress(data)
      })
      .catch((error) => {
        console.error("Error fetching progress:", error)
      })
  }, [])

  const getPercentage = (
    solvedCount: number,
    totalCount: number
  ) => {
    if (totalCount === 0) {
      return 0
    }

    return Math.round(
      (solvedCount / totalCount) * 100
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      <div>
        <h1 className="text-4xl font-bold">
          Progress
        </h1>

        <p className="mt-3 text-gray-400">
          See how your DSA preparation is progressing.
        </p>
      </div>

      <section className="mt-10 rounded-xl border border-gray-800 bg-[#171a23] p-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Overall Progress
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {progress.percentage}%
            </h2>
          </div>

          <p className="text-gray-400">
            {progress.solved} / {progress.total} solved
          </p>
        </div>

        <div className="mt-8 h-4 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{
              width: `${progress.percentage}%`,
            }}
          />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl border border-gray-800 bg-[#171a23] p-6">
          <p className="text-sm text-gray-400">
            Easy
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {progress.easySolved}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {progress.easySolved} / {progress.easyTotal} solved
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: `${getPercentage(
                  progress.easySolved,
                  progress.easyTotal
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#171a23] p-6">
          <p className="text-sm text-gray-400">
            Medium
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            {progress.mediumSolved}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {progress.mediumSolved} / {progress.mediumTotal} solved
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-yellow-500"
              style={{
                width: `${getPercentage(
                  progress.mediumSolved,
                  progress.mediumTotal
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#171a23] p-6">
          <p className="text-sm text-gray-400">
            Hard
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {progress.hardSolved}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {progress.hardSolved} / {progress.hardTotal} solved
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-red-500"
              style={{
                width: `${getPercentage(
                  progress.hardSolved,
                  progress.hardTotal
                )}%`,
              }}
            />
          </div>
        </div>

      </section>

      <section className="mt-8 rounded-xl border border-gray-800 bg-[#171a23] p-6">
        <h2 className="text-xl font-semibold">
          Summary
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">

          <div>
            <p className="text-sm text-gray-500">
              Total Problems
            </p>

            <p className="mt-1 text-2xl font-bold">
              {progress.total}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Solved
            </p>

            <p className="mt-1 text-2xl font-bold">
              {progress.solved}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Remaining
            </p>

            <p className="mt-1 text-2xl font-bold">
              {progress.remaining}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Completion
            </p>

            <p className="mt-1 text-2xl font-bold">
              {progress.percentage}%
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Progress