import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { getTasks } from '../../service/taskService'

export const useGetTasks = (sprintId) => {
  return useQuery({
    queryKey: queryKeys.getAllTasks(sprintId),
    queryFn: () => getTasks(sprintId),
  })
}
