import { http, HttpResponse, HttpHandler } from "msw";

export const getMockTask: HttpHandler = http.get("/tasks", () => {
  return HttpResponse.json({
    data: {
      data: [],
    },
  });
});
