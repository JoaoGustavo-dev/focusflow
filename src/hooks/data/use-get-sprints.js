import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../keys/queryKeys'
import { api } from '../../lib/axios'

export const useGetSprints = () => {
  return useQuery({
    queryKey: queryKeys.getAllSprints(),
    queryFn: async () => {
      const { data: sprints } = await api.get('/sprints')
      return sprints
    },
  })
}
