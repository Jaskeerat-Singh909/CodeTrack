import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import StatCard from "./components/StatCard"
import Problems from "./pages/Problems"
import Progress from "./pages/Progress"
import {
  type Activity,
  type Problem,
} from "./data/problems"

function App() {
  const [page, setPage] = useState("dashboard")

  const [problems, setProblems] = useState<Problem[]>([])
  useEffect(() => {
    fetch("http://localhost:8080/api/problems")
      .then((response) => response.json())
      .then((data) => {
        setProblems(data);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
      });
  }, []);

  const [activities, setActivities] = useState<Activity[]>(() => {
    const savedActivities = localStorage.getItem(
      "codetrack-activities"
    )

    if (savedActivities) {
      return JSON.parse(savedActivities)
    }

    return []
  })

  

  useEffect(() => {
    localStorage.setItem(
      "codetrack-activities",
      JSON.stringify(activities)
    )
  }, [activities])

  const addActivity = (message: string) => {
    const newActivity: Activity = {
      id: Date.now(),
      message,
      time: new Date().toLocaleString(),
    }

    setActivities((currentActivities) => [
      newActivity,
      ...currentActivities,
    ])
  }

  const toggleSolved = async (id: number) => {
    const problem = problems.find(
      (problem) => problem.id === id
    )

    if (!problem) {
      return
    }

    const newSolvedStatus = !problem.solved

    try {
      await fetch(
        `http://localhost:8080/api/problems/${id}/${newSolvedStatus ? "solve" : "unsolve"}`,
        {
          method: "PUT",
        }
      )

      setProblems(
        problems.map((problem) =>
          problem.id === id
            ? {
              ...problem,
              solved: newSolvedStatus,
            }
            : problem
        )
      )

      addActivity(
        newSolvedStatus
          ? `Solved "${problem.title}"`
          : `Marked "${problem.title}" as unsolved`
      )
    } catch (error) {
      console.error("Error updating problem:", error)
    }
  }

  const addProblem = async (newProblem: Problem) => {
    console.log("ADD PROBLEM CALLED", newProblem)
    try {
      await fetch(
        `http://localhost:8080/api/problems?id=${newProblem.id}&title=${encodeURIComponent(newProblem.title)}&topic=${encodeURIComponent(newProblem.topic)}&difficulty=${newProblem.difficulty}&link=${encodeURIComponent(newProblem.link)}`,
        {
          method: "POST",
        }
      )

      setProblems([...problems, newProblem])

      addActivity(`Added "${newProblem.title}"`)
    } catch (error) {
      console.error("Error adding problem:", error)
    }
  }

  const deleteProblem = async (id: number) => {
    const problem = problems.find(
      (problem) => problem.id === id
    )

    if (!problem) {
      return
    }

    try {
      await fetch(
        `http://localhost:8080/api/problems/${id}`,
        {
          method: "DELETE",
        }
      )

      setProblems(
        problems.filter((problem) => problem.id !== id)
      )

      addActivity(`Deleted "${problem.title}"`)
    } catch (error) {
      console.error("Error deleting problem:", error)
    }
  }

  const solvedCount = problems.filter(
    (problem) => problem.solved
  ).length

  const easySolved = problems.filter(
    (problem) =>
      problem.solved && problem.difficulty === "Easy"
  ).length

  const mediumSolved = problems.filter(
    (problem) =>
      problem.solved && problem.difficulty === "Medium"
  ).length

  const progress =
    problems.length === 0
      ? 0
      : Math.round((solvedCount / problems.length) * 100)

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <Navbar page={page} setPage={setPage} />

      {page === "dashboard" && (
        <main className="mx-auto max-w-7xl px-8 py-12">
          <section>
            <h1 className="text-4xl font-bold">
              Welcome back
            </h1>

            <p className="mt-3 text-gray-400">
              Track your DSA journey and stay consistent.
            </p>
          </section>

          <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Problems Solved"
              value={String(solvedCount)}
              description={`out of ${problems.length} problems`}
            />

            <StatCard
              title="Remaining"
              value={String(problems.length - solvedCount)}
              description="problems left to solve"
            />

            <StatCard
              title="Easy"
              value={String(easySolved)}
              description="problems solved"
            />

            <StatCard
              title="Medium"
              value={String(mediumSolved)}
              description="problems solved"
            />
          </section>

          <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-[#171a23] p-6">
              <h2 className="text-xl font-semibold">
                Recent Activity
              </h2>

              {activities.length === 0 ? (
                <p className="mt-4 text-gray-400">
                  No recent activity yet.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {activities.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between border-b border-gray-800 pb-3"
                    >
                      <span className="text-gray-300">
                        {activity.message}
                      </span>

                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#171a23] p-6">
              <h2 className="text-xl font-semibold">
                Overall Progress
              </h2>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-gray-400">
                {progress}% of your problem set completed
              </p>
            </div>
          </section>
        </main>
      )}

      {page === "problems" && (
        <Problems
          problems={problems}
          onToggleSolved={toggleSolved}
          onAddProblem={addProblem}
          onDeleteProblem={deleteProblem}
        />
      )}

      {page === "progress" && (
        <Progress />
      )}
    </div>
  )
}

export default App
