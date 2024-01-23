import "./Card.css";

/** Card component for card drawn in app
 *
 * Props:
 * - value (like "6", "JACK", "QUEEN", "ACE")
 * - suit ("HEARTS", "SPADES", "CLUBS", "DIAMONDS")
 *
 * States:
 * - None
 *
 * App -> Card
 */

function Card({ value, suit }) {
  return (
    <div className="Card">
      <h1>Card: {value} of {suit}</h1>
    </div>
  );
}

export default Card;
