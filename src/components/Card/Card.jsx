import React from 'react'
import './card.scss'

const Card = card => {
  const { icon, rotated, click } = card
  return (
    <div
      onClick={() => click(card)}
      className={`card${rotated ? ' rotate' : ''}`}
    >
      <div className="front" />
      <div className="back">
        <span className={`far fa-${icon}`} />
      </div>
    </div>
  )
}

export default Card
