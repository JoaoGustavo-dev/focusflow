import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useCreateSprint = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.addSprint(),
    mutationFn: async (sprint) => {
      const { data: createdSprint } = await api.post('/sprints', sprint)
      return createdSprint
    },
    onSuccess: (createdSprint) => {
      queryClient.setQueryData(queryKeys.getAllSprints(), (oldSprints) => [
        ...oldSprints,
        createdSprint,
      ])
    },
  })
}
