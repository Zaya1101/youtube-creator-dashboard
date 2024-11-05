import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import Card from "components/Card";
import Table from "components/Table";
import CheckAuth from "components/CheckAuth";

import "./tasks.css";

export const Route = createFileRoute("/tasks/")({
  component: Tasks,
})

const columnns = [
  {
    header: "Task", 
    accessorKey: "task",
  },
  {
    header: "Video Title",
    accessorKey: "videoTitle",
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
]

function Tasks() {
  return (
    <CheckAuth>
      <div id="Tasks">
        <div className="tasks-container fade-in">
          <Card title="Tasks" className="tasks-card">
            <Table
              columns={columnns}
              data={[]}
              isLoading={false}
              noDataText="No tasks found."
            />
          </Card>
        </div>
      </div>
    </CheckAuth>
  );
}
