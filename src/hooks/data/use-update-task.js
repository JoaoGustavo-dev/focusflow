import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { updateTask } from '../../service/taskService'
import { resolveSprintStatus } from '../../utils/resolveSprintStatus'
import { useUpdateSprint } from './use-update-sprint'

export const useUpdateTask = (sprintId, taskId) => {
  const queryClient = useQueryClient()
  const { mutate: update } = useUpdateSprint(sprintId)

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
      const staleTasks = queryClient.getQueryData(
        queryKeys.getAllTasks(updatedTask.sprintId)
      )

      const updatedTasks = staleTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask
        }

        return task
      })

      const staleSprint = queryClient.getQueryData(
        queryKeys.getOneSprint(updatedTask.sprintId)
      )

      const realSprintStatus = resolveSprintStatus(updatedTasks)

      if (realSprintStatus !== staleSprint.status) {
        update({
          status: realSprintStatus,
        })
      }
    },
  })
}
