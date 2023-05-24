import Deck from "../models/deck";
import { Response, Request } from "express";

export async function deleteDeckController(req: Request, res: Response){
    const deckId = req.params.deckId;

    const deck = await Deck.findByIdAndDelete(deckId);

    res.json(deck)
}