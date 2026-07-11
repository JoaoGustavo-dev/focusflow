import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { getSprints } from '../../service/sprintService'

export const useGetSprints = () => {
  return useQuery({
    queryKey: queryKeys.getAllSprints(),
    queryFn: () => getSprints(),
  })
}
