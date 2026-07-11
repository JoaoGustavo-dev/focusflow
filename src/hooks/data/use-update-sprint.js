import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { updateSprint } from '../../service/sprintService'

export const useUpdateSprint = (sprintId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.updateSprint(),
    mutationFn: (sprint) => updateSprint(sprintId, sprint),
    onSuccess: (updatedSprint) => {
      queryClient.setQueryData(queryKeys.getOneSprint(sprintId), updatedSprint)
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllSprints() })
    },
  })
}
