import { http, HttpResponse, HttpHandler } from "msw";

export const getMockTask: HttpHandler = http.get("/tasks", ({ request }) => {
  return HttpResponse.json({
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 2,
    data: [
      {
        title:
          "Verificar listagem de carnes com parcelas a pagar (user normal - regra so pode listar carnês que tem parcelas de 1° até a 12° parcela)",
        status: "done",
        id: "24522f97-39f9-44e2-8208-05bb682b40d2",
        createdAt: "2025-05-03T02:52:52.282Z",
      },
      {
        title:
          "Verificar listagem de carnes disponíveis a resgate (Deve conter apenas os carnês com Status quitado e opcional pagar 13° parcela)",
        status: "done",
        id: "b3de1778-dc9e-4acd-aa33-9cc797b5ed8d",
        createdAt: "2025-05-03T03:14:03.346Z",
      },
    ],
  });
});
