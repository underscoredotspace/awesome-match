import React from 'react'

const Card = ({ icon, hue, count, matched, rotated, gameOver, click, ndx }) => (
  <div
    onClick={() => rotated || click(ndx)}
    className={`${matched ? 'matched ' : ''} ${
      rotated ? 'rotated ' : ''
    } card`.trim()}
  >
    <div className="front" />
    <div className="back" style={{ '--hue': hue }}>
      <span className={`icon far fa-${icon}`} />
      {gameOver && <span className="count">{count}</span>}
    </div>
  </div>
)

export default Card
