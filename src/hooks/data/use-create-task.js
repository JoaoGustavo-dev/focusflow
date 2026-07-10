import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { createTask } from '../../service/taskService'

export const useCreateTask = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.addTask(),
    mutationFn: (task) => createTask(sprintId, task),
    onSuccess: (createdTask) => {
      queryClient.setQueryData(queryKeys.getAllTasks(sprintId), (oldTasks) => {
        const taskList = oldTasks ?? []

        return [...taskList, createdTask]
      })
    },
  })
}
