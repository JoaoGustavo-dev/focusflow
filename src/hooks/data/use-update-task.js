import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { updateTask } from '../../service/taskService'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.updateTask(),
    mutationFn: (task) => updateTask(taskId, task),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        queryKeys.getOneTask(updatedTask.sprintId, taskId),
        updatedTask
      )
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAllTasks(updatedTask.sprintId),
      })
    },
  })
}
