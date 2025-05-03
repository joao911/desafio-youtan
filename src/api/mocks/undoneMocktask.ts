import { http, HttpResponse, HttpHandler } from "msw";

export const undoneMockTask: HttpHandler = http.put("/tasks", () => {
  return HttpResponse.json({
    title:
      "Verificar listagem de carnes com parcelas a pagar (user normal - regra so pode listar carnês que tem parcelas de 1° até a 12° parcela)",
    status: "done",
    id: "24522f97-39f9-44e2-8208-05bb682b40d2",
    createdAt: "2025-05-03T02:52:52.282Z",
  });
});
