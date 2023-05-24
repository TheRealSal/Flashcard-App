import express, {Request, Response} from "express";
import mongoose, { deleteModel } from 'mongoose'
import Deck from "./models/deck";
import {config} from "dotenv";
import cors from 'cors';
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const PORT = 3000;
config();
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Decks
app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);

// Cards
app.post('/decks/:deckId/cards', createCardForDeckController);
app.get('/decks/:deckId', getDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController)

mongoose.connect(process.env.MONGO_URL!)
.then(() =>{
    console.log("Connected")
    app.listen(PORT);
});