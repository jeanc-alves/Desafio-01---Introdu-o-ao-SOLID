import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.body;
    try {
      const all = this.listAllUsersUseCase.execute({ user_id });
      console.log("all :", all);

      return response.status(200).json(all);
    } catch (error) {
      return response.status(400).json({ error: "n" });
    }
  }
}

export { ListAllUsersController };
