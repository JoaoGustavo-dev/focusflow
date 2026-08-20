export const resolveSprintStatus = (tasks) => {
  if (tasks.every((task) => task.status === 'pending')) {
    return 'pending'
  }
  if (tasks.every((task) => task.status === 'done')) {
    return 'done'
  }

  return 'in-progress'
}
