import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useDeleteSprint = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.deleteSprint(),
    mutationFn: async () => {
      const { data: deletedSprint } = await api.delete(`/sprints/${sprintId}`)
      return deletedSprint
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.getAllSprints(), (oldSprints) => {
        return oldSprints.filter((sprint) => sprint.id !== sprintId)
      })

      queryClient.removeQueries({ queryKey: queryKeys.getOneSprint(sprintId) })
    },
  })
}
