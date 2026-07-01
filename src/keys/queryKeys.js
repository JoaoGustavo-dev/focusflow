export const queryKeys = {
  getAllSprints: () => ['sprints'],
  getOneSprint: (sprintId) => ['sprints', sprintId],
  getAllTasks: (sprintId) => ['tasks', sprintId],
  getOneTask: (sprintId, taskId) => ['tasks', sprintId, taskId],
}
