import './App.css';
import { useEffect, useState } from 'react';

import Card from './Card';

const BASE_DECK_URL = "https://deckofcardsapi.com/api/deck"

/** App component to draw cards
 *
 * Props:
 * -
 *
 * States:
 * - deckId (like "4jde1gunsndf")
 * - cardsDrawn [{value, suit}, {value, suit},...]
 *
 * App -> Card
 */

function App() {
  const [deckId, setDeckId] = useState();
  const [cardsDrawn, setCardsDrawn] = useState([ ]);

  useEffect(function fetchShuffledDeckWhenMounted () {
    async function fetchShuffledDeck() {
      const response = await fetch(
        `${BASE_DECK_URL}/new/shuffle/?deck_count=1`
      )
      const shuffleResult = await response.json();
      setDeckId(shuffleResult.deck_id);
    }
    fetchShuffledDeck();
  }, [ ]);



  return (
    <div className="App">
      {
        deckId
        ? <button>Get new card!</button>
        : <h1>Shuffling cards!</h1>
      }
      <h2>Cards drawn:</h2>
      <ul>
        {
          cardsDrawn.map(card =>
            <Card
              key={`${card.value}-of-${card.suit}`}
              value={card.value}
              suit={card.suit} />
          )
        }
      </ul>
    </div>
  );
}

export default App;
