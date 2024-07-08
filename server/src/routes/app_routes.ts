import { Router, Request, Response } from "express";
import { startPreparingReport } from "../report";
import { TimePeriod } from "../types/core.types";
import { QueueData, QueueTypes } from "../types/bull.types";
import { queue } from "../bull/queue";
const apiRouter = Router();

apiRouter.post("/reports", async (req: Request, res: Response) => {
  const { username } = req.body;
  const usernamel = username.toLowerCase();
  if (!username)
    return res.json({ status: "error", message: "Username is required" });
  const response = await startPreparingReport(usernamel);
  return res.json(response);
});

apiRouter.get("/reports", async (req: Request, res: Response) => {
  const periods: TimePeriod[] = ["month", "week", "quarter"];
  for (const period of periods) {
    const task: QueueData = {
      tag: "b21083",
      type: QueueTypes.GENERATE_INSIGHTS,
      data: {
        username: "b21083",
        period: period,
      },
    };
    await queue.add(task);
  }
  res.json({ sucess: "true" });
});

export default apiRouter;
