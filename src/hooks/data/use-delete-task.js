import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { deleteTask } from '../../service/taskService'

export const useDeleteTask = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.deleteTask(),
    mutationFn: (taskId) => deleteTask(taskId),

    onSuccess: (deletedTask, taskId) => {
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
