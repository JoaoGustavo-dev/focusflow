import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { deleteSprint } from '../../service/sprintService'

export const useDeleteSprint = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.deleteSprint(),
    mutationFn: () => deleteSprint(sprintId),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.getAllSprints(), (oldSprints) => {
        const sprintList = oldSprints ?? []

        return sprintList.filter((sprint) => sprint.id !== sprintId)
      })

      queryClient.removeQueries({ queryKey: queryKeys.getOneSprint(sprintId) })
    },
  })
}
