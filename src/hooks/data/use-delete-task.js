import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useDeleteTask = (sprintId, taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.deleteTask(),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(
        `/sprints/${sprintId}/tasks/${taskId}`
      )
      return deletedTask
    },

    onSuccess: () => {
      queryClient.setQueryData(queryKeys.getAllTasks(sprintId), (oldTasks) => {
        const taskList = oldTasks ?? []

        return taskList.filter((task) => task.id !== taskId)
      })

      queryClient.removeQueries({
        queryKey: queryKeys.getOneTask(sprintId, taskId),
      })
    },
  })
}
