import React from 'react'

const Card = card => {
  const { icon, rotated, click, ndx } = card
  return (
    <div
      onClick={() => click(ndx)}
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
