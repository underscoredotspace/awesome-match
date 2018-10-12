import React from 'react'

const Card = card => {
  const { icon, hue, rotated, click, ndx } = card
  return (
    <div
      onClick={() => rotated || click(ndx)}
      className={`card${rotated ? ' rotate' : ''}`}
    >
      <div className="front" />
      <div className="back" style={{'--hue': hue}}>
        <span className={`far fa-${icon}`} />
      </div>
    </div>
  )
}

export default Card
