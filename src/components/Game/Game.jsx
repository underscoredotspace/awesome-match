import React, { Component } from 'react'
import Card from '../Card/Card'
import shuffle from '../../helpers/shuffle'
import emoji from '../../helpers/emoji'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: new Array(16).fill(0),
      showing: null,
      wait: false
    }

    this.click = this.click.bind(this)
  }

  componentDidMount() {
    this.loadCards()
  }

  loadCards() {
    const set = shuffle(emoji).slice(0,8)
    const emojis = shuffle([...set, ...set])

    const { board } = this.state
    const hueSegment = Math.floor(360 / set.length)

    for (let ndx in board) {
      const emojiNdx = set.findIndex(e=>e===emojis[ndx])

      const hue = emojiNdx * hueSegment
      board[ndx] = { icon: emojis[ndx], rotated: false, matched: false, hue }
    }

    console.log({board});
    
    this.setState({ board })
  }

  click(ndx) {
    let { board, showing, wait } = this.state
    if (wait) { return }

    const card = board[ndx]
    card.rotated = true

    if (!showing) {
      showing = card
    } else {
      if (card.icon !== showing.icon) {
        wait = true
        setTimeout(() => {
          showing.rotated = false
          card.rotated = false
          wait = false
          
          showing = null
          
          this.setState({ board, showing, wait })
        }, 1000)
      } else {
        card.matched = true
        showing.matched = true
        showing = null
      }
    }

    this.setState({board, showing, wait})
  }

  render() {
    return (
      <div className="game">
        {this.state.board.map((card, ndx) => (
          <Card click={this.click} {...card} ndx={ndx} key={`card-${ndx}`} />
        ))}
      </div>
    )
  }
}

export default Game
