import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { api } from '../../lib/axios'

export const useGetTask = (sprintId, taskId) => {
  return useQuery({
    queryKey: queryKeys.getOneTask(sprintId, taskId),
    queryFn: async () => {
      const { data: task } = await api.get(
        `/sprints/${sprintId}/tasks/${taskId}`
      )
      return task
    },
  })
}
