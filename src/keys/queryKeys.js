export const queryKeys = {
  getAllSprints: () => ['sprints'],
  getOneSprint: (sprintId) => ['sprints', sprintId],
  getAllTAsks: (sprintId) => ['tasks', sprintId],
  getOneTask: (sprintId, taskId) => ['tasks', sprintId, taskId],
}
