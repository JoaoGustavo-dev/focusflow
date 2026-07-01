import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { api } from '../../lib/axios'
import { queryKeys } from '../../keys/queryKeys'

export const useUpdateSprint = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.updateSprint(),
    mutationFn: async (sprint) => {
      const { data: updatedSprint } = await api.patch(
        `/sprints/${sprintId}`,
        sprint
      )
      return updatedSprint
    },
    onSuccess: (updatedSprint) => {
      queryClient.setQueryData(queryKeys.getOneSprint(sprintId), updatedSprint)
      queryClient.invalidateQueries(queryKeys.getAllSprints())
    },
  })
}
