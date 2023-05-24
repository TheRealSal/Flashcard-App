import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { createDeck } from './api/createDeck';
import { TDeck, getDecks } from './api/getDecks';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  useEffect(() => {
    async function fetchDecks(){
      const newDecks = await getDecks();
      setDecks(newDecks);
    }

    fetchDecks();
  }, [])

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle('');
  }

  async function handleDeleteDeck(deckId : string) {
    await deleteDeck(deckId);

    setDecks( decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="App">
      <h1>Your Decks</h1>
      <ul className="decks">
        {
          decks.map((deck) => {
            return ( 
            <li key={deck._id}>
              <button onClick={() => {
                handleDeleteDeck(deck._id)}}>
                  X
              </button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input id='deck-title'
        value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create new deck</button>
      </form>
    </div>
  );
}

export default App
