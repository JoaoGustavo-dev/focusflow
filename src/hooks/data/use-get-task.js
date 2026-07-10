import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { getTask } from '../../service/taskService'

export const useGetTask = (sprintId, taskId) => {
  return useQuery({
    queryKey: queryKeys.getOneTask(sprintId, taskId),
    queryFn: () => getTask(sprintId, taskId),
  })
}
