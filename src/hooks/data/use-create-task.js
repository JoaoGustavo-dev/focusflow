import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useCreateTask = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.addTask(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post(
        `/sprints/${sprintId}/tasks`,
        task
      )
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(queryKeys.getAllTasks(sprintId), (oldTasks) => {
        const taskList = oldTasks ?? []

        return [...taskList, createdTask]
      })
    },
  })
}
