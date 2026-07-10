import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { updateTask } from '../../service/taskService'

export const useUpdateTask = (sprintId, taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.updateTask(),
    mutationFn: (task) => updateTask(sprintId, taskId, task),
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
