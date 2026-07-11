import { api } from '../lib/axios'

export const getSprints = async () => {
  const { data: sprints } = await api.get('/sprints')
  return sprints
}

export const getSprint = async (sprintId) => {
  const { data: sprint } = await api.get(`/sprints/${sprintId}`)
  return sprint
}

export const createSprint = async (sprint) => {
  const { data: createdSprint } = await api.post('/sprints', sprint)
  return createdSprint
}

export const updateSprint = async (sprintId, sprint) => {
  const { data: updatedSprint } = await api.patch(
    `/sprints/${sprintId}`,
    sprint
  )
  return updatedSprint
}

export const deleteSprint = async (sprintId) => {
  const { data: deletedSprint } = await api.delete(`/sprints/${sprintId}`)
  return deletedSprint
}
