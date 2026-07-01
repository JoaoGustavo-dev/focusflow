import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { api } from '../../lib/axios'

export const useGetSprint = (sprintId) => {
  return useQuery({
    queryKey: queryKeys.getOneSprint(sprintId),
    queryFn: async () => {
      const { data: tasks } = await api.get(`/sprints/${sprintId}/tasks`)
      return tasks
    },
  })
}
