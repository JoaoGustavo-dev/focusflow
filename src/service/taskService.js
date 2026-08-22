import { api } from '../lib/axios'

export const getTasks = async (sprintId) => {
  const { data: tasks } = await api.get('/tasks')
  return sprintId ? tasks.filter((task) => task.sprintId === sprintId) : tasks
}

export const getTask = async (taskId) => {
  const { data: task } = await api.get(`/tasks/${taskId}`)
  return task
}

export const createTask = async (sprintId, task) => {
  const { data: createdTask } = await api.post(
    `/sprints/${sprintId}/tasks`,
    task
  )
  return createdTask
}

export const updateTask = async (taskId, task) => {
  const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, task)
  return updatedTask
}

export const deleteTask = async (taskId) => {
  const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
  return deletedTask
}
