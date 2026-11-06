import { useState } from "react"
import type { Problem } from "../data/problems"

type ProblemsProps = {
    problems: Problem[]
    onToggleSolved: (id: number) => void
    onAddProblem: (problem: Problem) => void
    onDeleteProblem: (id: number) => void
}

function Problems({
    problems,
    onToggleSolved,
    onAddProblem,
    onDeleteProblem,
}: ProblemsProps) {
    const [search, setSearch] = useState("")
    const [difficulty, setDifficulty] = useState("All")

    const [showForm, setShowForm] = useState(false)

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [newDifficulty, setNewDifficulty] = useState("Easy")
    const [link, setLink] = useState("")

    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = problem.title
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesDifficulty =
            difficulty === "All" ||
            problem.difficulty === difficulty

        return matchesSearch && matchesDifficulty
    })

    const handleAddProblem = () => {
        if (!title.trim() || !topic.trim() || !link.trim()) {
            return
        }

        const newProblem: Problem = {
            id: Math.floor(Math.random() * 1000000),
            title: title.trim(),
            topic: topic.trim(),
            difficulty: newDifficulty,
            solved: false,
            link: link.trim(),
        }

        onAddProblem(newProblem)

        setTitle("")
        setTopic("")
        setNewDifficulty("Easy")
        setLink("")
        setShowForm(false)
    }

    return (
        <main className="mx-auto max-w-7xl px-8 py-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        Problems
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Track and manage your DSA problems.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
                >
                    + Add Problem
                </button>
            </div>

            {showForm && (
                <div className="mt-8 rounded-xl border border-gray-800 bg-[#171a23] p-6">
                    <h2 className="text-xl font-semibold">
                        Add New Problem
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Problem title"
                            className="rounded-lg border border-gray-700 bg-[#0f1117] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
                        />

                        <input
                            type="text"
                            value={topic}
                            onChange={(event) => setTopic(event.target.value)}
                            placeholder="Topic e.g. Array"
                            className="rounded-lg border border-gray-700 bg-[#0f1117] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
                        />

                        <input
                            type="url"
                            value={link}
                            onChange={(event) => setLink(event.target.value)}
                            placeholder="LeetCode URL"
                            className="rounded-lg border border-gray-700 bg-[#0f1117] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
                        />

                        <select
                            value={newDifficulty}
                            onChange={(event) =>
                                setNewDifficulty(event.target.value)
                            }
                            className="rounded-lg border border-gray-700 bg-[#0f1117] px-4 py-3 text-gray-300 outline-none"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <button
                            onClick={handleAddProblem}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium hover:bg-blue-500"
                        >
                            Add Problem
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="rounded-lg border border-gray-700 px-5 py-2.5 text-gray-300 hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search problems..."
                    className="rounded-lg border border-gray-700 bg-[#171a23] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500 sm:w-96"
                />

                <select
                    value={difficulty}
                    onChange={(event) => setDifficulty(event.target.value)}
                    className="rounded-lg border border-gray-700 bg-[#171a23] px-4 py-3 text-gray-300 outline-none"
                >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-gray-800">
                <div className="grid min-w-[900px] grid-cols-6 bg-[#171a23] px-6 py-4 text-sm font-semibold text-gray-400">
                    <span>Problem</span>
                    <span>Topic</span>
                    <span>Difficulty</span>
                    <span>Status</span>
                    <span>Action</span>
                    <span>Delete</span>
                </div>

                {filteredProblems.map((problem) => (
                    <div
                        key={problem.id}
                        className="grid min-w-[900px] grid-cols-6 items-center border-t border-gray-800 px-6 py-5"
                    >
                        <span className="font-medium">
                            <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                                {problem.title}
                            </a>
                        </span>

                        <span className="text-gray-400">
                            {problem.topic}
                        </span>

                        <span
                            className={
                                problem.difficulty === "Easy"
                                    ? "text-green-400"
                                    : problem.difficulty === "Medium"
                                        ? "text-yellow-400"
                                        : "text-red-400"
                            }
                        >
                            {problem.difficulty}
                        </span>

                        <span
                            className={
                                problem.solved
                                    ? "text-green-400"
                                    : "text-gray-500"
                            }
                        >
                            {problem.solved ? "Solved" : "Not Solved"}
                        </span>

                        <button
                            onClick={() => onToggleSolved(problem.id)}
                            className="w-fit rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                        >
                            {problem.solved
                                ? "Mark Unsolved"
                                : "Mark Solved"}
                        </button>

                        <button
                            onClick={() => {
                                const confirmed = window.confirm(
                                    `Delete "${problem.title}"?`
                                )

                                if (confirmed) {
                                    onDeleteProblem(problem.id)
                                }
                            }}
                            className="w-fit rounded-lg border border-red-900 px-3 py-2 text-sm text-red-400 hover:bg-red-950"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {filteredProblems.length === 0 && (
                    <div className="border-t border-gray-800 px-6 py-12 text-center">
                        <p className="text-lg font-medium text-gray-300">
                            No problems found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Try changing your search or difficulty filter.
                        </p>
                    </div>
                )}
            </div>

            <p className="mt-4 text-sm text-gray-500">
                Showing {filteredProblems.length} of {problems.length} problems
            </p>
        </main>
    )
}

export default Problems