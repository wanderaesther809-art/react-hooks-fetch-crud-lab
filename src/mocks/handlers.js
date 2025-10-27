import { rest } from "msw";

export const handlers = [
  // 🟢 Get all questions
  rest.get("/questions", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          prompt: "lorem testum 1",
          answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
          correctIndex: 0,
        },
        {
          id: 2,
          prompt: "lorem testum 2",
          answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
          correctIndex: 1,
        },
      ])
    );
  }),

  // 🟢 Create a new question
  rest.post("/questions", async (req, res, ctx) => {
    const newQuestion = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        ...newQuestion,
      })
    );
  }),

  // 🟢 Update an existing question (change correct answer)
  rest.patch("/questions/:id", async (req, res, ctx) => {
    const updated = await req.json();
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(id),
        ...updated,
      })
    );
  }),

  // 🟢 Delete a question
  rest.delete("/questions/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
