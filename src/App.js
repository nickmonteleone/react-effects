import './App.css';
import { useEffect, useState } from 'react';

import Card from './Card';

const BASE_DECK_URL = "https://deckofcardsapi.com/api/deck";

/** App component to draw cards
 *
 * Props:
 * -
 *
 * States:
 * - deckId (like "4jde1gunsndf")
 * - cardsDrawn [{code, image, images, value, suit}, {value, suit},...]
 *
 * App -> Card
 */

function App() {
  const [deckId, setDeckId] = useState();
  const [cardsDrawn, setCardsDrawn] = useState([]);


  useEffect(function fetchShuffledDeckWhenMounted() {
    async function fetchShuffledDeck() {
      const response = await fetch(
        `${BASE_DECK_URL}/new/shuffle/?deck_count=1`
      );
      const shuffleResult = await response.json();
      setDeckId(shuffleResult.deck_id);
    }
    fetchShuffledDeck();
  }, []);

  async function fetchRandomCard() {
    const response = await fetch(
      `${BASE_DECK_URL}/${deckId}/draw/?count=1`
    );
    const cardResult = await response.json();
    const cardData = cardResult.cards[0];
    const remainingCards = cardResult.remaining;
    setCardsDrawn([...cardsDrawn, {
      suit: cardData.suit,
      value: cardData.value,
      remaining: remainingCards
    }]);
  }


  return (
    <div className="App">
      {
        deckId
          ? <button onClick={fetchRandomCard}>Get new card!</button>
          : <h1>Shuffling cards!</h1>
      }
      <h2>Cards drawn: {cardsDrawn.length === 52 ? "No more cards": cardsDrawn.length}</h2>
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
