import { api } from '../lib/axios'

export const getTasks = async (sprintId) => {
  const { data: tasks } = await api.get(`/sprints/${sprintId}/tasks`)
  return tasks
}

export const getTask = async (sprintId, taskId) => {
  const { data: task } = await api.get(`/sprints/${sprintId}/tasks/${taskId}`)
  return task
}

export const createTask = async (sprintId, task) => {
  const { data: createdTask } = await api.post(
    `/sprints/${sprintId}/tasks`,
    task
  )
  return createdTask
}

export const updateTask = async (sprintId, taskId, task) => {
  const { data: updatedTask } = await api.patch(
    `/sprints/${sprintId}/tasks/${taskId}`,
    task
  )
  return updatedTask
}

export const deleteTask = async (sprintId, taskId) => {
  const { data: deletedTask } = await api.delete(
    `/sprints/${sprintId}/tasks/${taskId}`
  )
  return deletedTask
}
