import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationKeys } from '../../keys/mutationKeys'
import { queryKeys } from '../../keys/queryKeys'
import { createSprint } from '../../service/sprintService'

export const useCreateSprint = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.addSprint(),
    mutationFn: (sprint) => createSprint(sprint),
    onSuccess: (createdSprint) => {
      queryClient.setQueryData(queryKeys.getAllSprints(), (oldSprints) => {
        const sprintList = oldSprints ?? []

        return [...sprintList, createdSprint]
      })
    },
  })
}
