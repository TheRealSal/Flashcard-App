import Deck from "../models/deck";
import { Response, Request } from "express";

export async function deleteCardOnDeckController(req: Request, res: Response){
    const deckId = req.params.deckId;
    const index = req.params.index;

    const deck = await Deck.findById(deckId);

    if(!deck){
        return res.status(400).send("No deck of this id exists")
    }

    deck.cards.splice(parseInt(index), 1);

    await deck.save();

    res.json(deck);
}