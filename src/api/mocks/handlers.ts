import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json({
      tasks: [
        {
          id: "cb4c5b38-7f2c-4be9-a5fe-603bde3d490a",
          title: "cccc",
          status: "to-do",
          createdAt: "2025-05-03T02:52:52.282Z"
        },
        {
          id: "261a25f7-9ced-48fd-9959-1339da1af566",
          title: "kkhjkhv",
          status: "to-do",
          createdAt: "2025-05-03T03:14:03.346Z"
        }
      ]
    })
  })
] 