import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { api } from '../../lib/axios'

export const useGetTasks = (sprintId) => {
  return useQuery({
    queryKey: queryKeys.getAllTasks(sprintId),
    queryFn: async () => {
      const { data: tasks } = await api.get(`/${sprintId}/tasks`)
      return tasks
    },
  })
}
