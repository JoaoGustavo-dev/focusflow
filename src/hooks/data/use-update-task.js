import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useUpdateTask = (sprintId, taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.updateTask(),
    mutationFn: async (task) => {
      const { data: updatedTask } = await api.patch(
        `/sprints/${sprintId}/tasks/${taskId}`,
        task
      )
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        queryKeys.getOneTask(sprintId, taskId),
        updatedTask
      )
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAllTasks(sprintId),
      })
    },
  })
}
