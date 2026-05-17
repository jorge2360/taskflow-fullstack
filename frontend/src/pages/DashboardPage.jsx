import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

function DashboardPage() {
  const { logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    due_date: '',
    })

  async function loadTasks() {
    const response = await api.get('/tasks')
    setTasks(response.data)
  }
    function handleChange(e) {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
    }

    async function saveTask(e) {
    e.preventDefault()

    const payload = {
        ...formData,
        due_date: formData.due_date || null,
    }

    if (editingId) {
        await api.put(`/tasks/${editingId}`, payload)
    } else {
        await api.post('/tasks', payload)
    }

    setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        due_date: '',
    })

    setEditingId(null)
    loadTasks()
    }
    
    function editTask(task) {
    setEditingId(task.id)

    setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        due_date: task.due_date || '',
    })
    }

    async function deleteTask(id) {
    const confirmed = window.confirm('¿Deseas eliminar esta tarea?')

    if (!confirmed) return

    await api.delete(`/tasks/${id}`)

    if (editingId === id) {
        setEditingId(null)
    }

    loadTasks()
    }

  useEffect(() => {
    loadTasks()
  }, [])

  function getPriorityBadge(priority) {
    const styles = {
        low: 'bg-emerald-100 text-emerald-700',
        medium: 'bg-amber-100 text-amber-700',
        high: 'bg-red-100 text-red-700',
    }

    const labels = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta',
    }

    return {
        className: styles[priority] || styles.medium,
        label: labels[priority] || 'Media',
    }
    }

    function getStatusBadge(status) {
    const styles = {
        pending: 'bg-slate-100 text-slate-700',
        in_progress: 'bg-blue-100 text-blue-700',
        completed: 'bg-emerald-100 text-emerald-700',
    }

    const labels = {
        pending: 'Pendiente',
        in_progress: 'En proceso',
        completed: 'Completada',
    }

    return {
        className: styles[status] || styles.pending,
        label: labels[status] || 'Pendiente',
    }
    }
    const filteredTasks = tasks.filter((task) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        (task.description || '').toLowerCase().includes(search)

    const matchesStatus = statusFilter ? task.status === statusFilter : true
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true

    return matchesSearch && matchesStatus && matchesPriority
    })

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
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-700">Cerrar sesión
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

        <form onSubmit={saveTask} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <h2 className="text-xl font-semibold">Nueva tarea</h2>

    <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        required/>

        <input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />

        <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
        </select>

        <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
        <option value="pending">Pendiente</option>
        <option value="in_progress">En proceso</option>
        <option value="completed">Completada</option>
        </select>

        <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white md:col-span-2"/>
    </div>

    <button
        type="submit"
        className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">{editingId ? 'Actualizar tarea' : 'Guardar tarea'}
    </button>
    </form>

    

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Listado de tareas</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o descripción"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />

        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En proceso</option>
            <option value="completed">Completada</option>
        </select>

        <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >
            <option value="">Todas las prioridades</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
        </select>
        </div>

          {filteredTasks.length === 0 ? (
            <p className="mt-4 text-slate-400">No hay tareas registradas.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                    <th className="py-3">Acciones</th>
                    <th className="py-3">Título</th>
                    <th className="py-3">Prioridad</th>
                    <th className="py-3">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-800">
                      <td className="py-3">{task.title}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityBadge(task.priority).className}`}>
                            {getPriorityBadge(task.priority).label}
                        </span>
                        </td>
                      <td className="py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(task.status).className}`}>
                            {getStatusBadge(task.status).label}
                        </span>
                        </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                            <button
                            type="button"
                            onClick={() => editTask(task)}
                            className="rounded-lg bg-amber-500 px-3 py-1 text-sm text-white hover:bg-amber-600">Editar
                            </button>

                            <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">Eliminar
                            </button>
                        </div>
                        </td>
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