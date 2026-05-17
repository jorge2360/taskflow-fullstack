import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

function DashboardPage() {
  const { logout } = useAuth()
  const [tasks, setTasks] = useState([])

  async function loadTasks() {
    const response = await api.get('/tasks')
    setTasks(response.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <p className="text-sm text-slate-400">Panel de tareas</p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total tareas</p>
            <h2 className="mt-3 text-4xl font-bold">{tasks.length}</h2>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Listado de tareas</h2>

          {tasks.length === 0 ? (
            <p className="mt-4 text-slate-400">No hay tareas registradas.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                    <th className="py-3">Título</th>
                    <th className="py-3">Prioridad</th>
                    <th className="py-3">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-800">
                      <td className="py-3">{task.title}</td>
                      <td className="py-3">{task.priority}</td>
                      <td className="py-3">{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default DashboardPage