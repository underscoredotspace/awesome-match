import React, { Component } from 'react'
import Card from '../Card/Card'
import shuffle from '../../helpers/shuffle'
import emoji from '../../helpers/emoji'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: new Array(64).fill(0),
      showing: null,
      wait: false
    }

    this.click = this.click.bind(this)
  }

  componentDidMount() {
    this.loadCards()
  }

  loadCards() {
    const emojis1 = new Array(32).fill(0).map(() => this.randomEmoji())
    const emojis = shuffle([...emojis1, ...emojis1])

    const { board } = this.state
    const hueSegment = Math.floor(360 / emoji.length)

    for (let ndx in board) {
      const emojiNdx = emoji.findIndex(e=>e===emojis[ndx])

      const hue = emojiNdx * hueSegment
      board[ndx] = { icon: emojis[ndx], rotated: false, hue }
    }

    this.setState({ board })
  }

  randomEmoji() {
    return emoji[Math.floor(Math.random() * emoji.length)]
  }

  click(ndx) {
    let { board, showing, wait } = this.state
    if (wait) { return }

    const card = board[ndx]
    card.rotated = true
    this.setState({board})

    if (!showing) {
      showing = card
      this.setState({ showing })
    } else {
      wait = true
      this.setState({wait})
      
      setTimeout(() => {
        showing.rotated = false
        card.rotated = false
        wait = false

        showing = null

        this.setState({ board, showing, wait })
      }, 3000)
    }
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
