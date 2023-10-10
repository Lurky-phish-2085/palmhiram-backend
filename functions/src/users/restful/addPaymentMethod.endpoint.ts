import { Request, Response } from "express";
import { Endpoint, RequestType } from "firebase-backend";
import { StatusCodes } from "http-status-codes";

export default new Endpoint(
  "addPaymentMethod",
  RequestType.POST,
  (req: Request, res: Response) => {
    const cardNumber = req.body["card_number"];
    const cardHolder = req.body["card_holder"];

    const paymentToken = `${cardNumber}_${cardHolder}`;

    return res.status(StatusCodes.CREATED).send({
      token: paymentToken,
    });
  }
);
