import { Routes, Route } from "react-router-dom";

import { TodoList } from "@/screens/TodoList";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
    </Routes>
  );
}
