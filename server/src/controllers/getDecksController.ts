import Deck from "../models/deck";
import { Response, Request } from "express";

export async function getDecksController(req: Request, res: Response){
    const decks = await Deck.find();
    console.log(decks);

    res.json(decks);
}