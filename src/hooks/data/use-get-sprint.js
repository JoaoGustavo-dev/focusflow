import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { getSprint } from '../../service/sprintService'

export const useGetSprint = (sprintId) => {
  return useQuery({
    queryKey: queryKeys.getOneSprint(sprintId),
    queryFn: () => getSprint(sprintId),
  })
}
