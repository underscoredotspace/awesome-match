import React from 'react'

const Card = card => {
  const { icon, hue, matched, rotated, click, ndx } = card
  return (
    <div
      onClick={() => rotated || click(ndx)}
      className={`${matched ? 'matched ' : ''} ${rotated ? 'rotated ' : ''} card`.trim()}
    >
      <div className="front" />
      <div className="back" style={{'--hue': hue}}>
        <span className={`far fa-${icon}`} />
      </div>
    </div>
  )
}

export default Card
