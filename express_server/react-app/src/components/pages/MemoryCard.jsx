import head from '../assets/Spanish.png'
import "../pages/MemoryCard.css"

const MemoryCard = ({card, handleCardClick, disabled}) => {

  return (
    <button className={`m-card ${card.matchFound ? "matched" : ""}`} disabled={disabled} onClick={handleCardClick} data-id={card.id}>
      <div className="front side">
        <img src={head}  width="60" />
      </div>
      <div className="side back">{card.emoji}</div>
    </button>
  )
}
export default MemoryCard