import { useEffect, useState } from 'react'
import './Deck.css'
import { useParams } from 'react-router-dom';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';
import { TDeck } from './api/getDecks';

export default function Deck() {
    
  const [text, setText] = useState('');
  const {deckId} = useParams();
  const [cards, setCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>();

  useEffect(() => {
    if (!deckId) return;
    async function fetchDeck(){
      const newDeck = await getDeck(deckId!);
      setDeck(newDeck);
      setCards(newDeck.cards)
    }

    fetchDeck();
  }, [deckId])

  async function handleCreateCard(e: React.FormEvent){
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId!, text);
    setCards(serverCards);
    setText('');
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  return (
    <div className="Deck">
        <h1>{deck?.title}</h1>
      <ul className="cards">
        {
          cards.map((card, index) => {
            return ( 
            <li key={index}>
              <button onClick={() => {
                handleDeleteCard(index)}}>
                  X
              </button>
              {card}
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor='card-text'>Card Text</label>
        <input id='card-text'
        value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}