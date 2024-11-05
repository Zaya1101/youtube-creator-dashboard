import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks')({
  component: Tasks,
})

function Tasks() {
  return (
    <div className="p-2">
      <h3>Tasks</h3>
    </div>
  )
}
