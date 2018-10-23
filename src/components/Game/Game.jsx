import React, { Component } from 'react'
import './game.scss'
import Card from '../Card/Card'
import shuffle from '../../helpers/shuffle'
import emoji from '../../helpers/emoji'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: [],
      gameOver: false,
      firstCard: null,
      wait: false,
      gameSeed: 0,
      resetWait: 0
    }

    this.flipCard = this.flipCard.bind(this)
    this.loadCards = this.loadCards.bind(this)
  }

  componentDidMount() {
    this.loadCards()
    this.setState({ resetWait: 500 })
  }

  loadCards() {
    let { board, resetWait } = this.state
    for (let card of board) {
      card.rotated = false
    }

    this.setState({ board })

    setTimeout(() => {
      const set = shuffle(emoji.slice()).slice(0, 8)
      const emojis = shuffle([...set, ...set])
      const hueSegment = Math.floor(360 / set.length)

      board = new Array(16).fill(0)
      const gameSeed = this.state.gameSeed + 1

      for (const ndx in board) {
        const emojiNdx = set.findIndex(emoji => emoji === emojis[ndx])

        const hue = emojiNdx * hueSegment
        board[ndx] = {
          icon: emojis[ndx],
          rotated: false,
          matched: false,
          hue,
          count: 0
        }
      }

      this.setState({
        board,
        gameSeed,
        gameOver: false,
        wait: null,
        firstCard: null
      })
    }, resetWait)
  }

  flipCard(ndx) {
    let { board, gameOver, firstCard, wait } = this.state
    if (wait || gameOver) {
      return
    }

    const card = board[ndx]
    card.rotated = true
    card.count++

    if (!firstCard) {
      firstCard = card
    } else {
      if (card.icon !== firstCard.icon) {
        wait = true
        setTimeout(() => {
          firstCard.rotated = false
          card.rotated = false
          wait = false
          firstCard = null

          this.setState({ board, firstCard, wait })
        }, 1000)
      } else {
        card.matched = true
        firstCard.matched = true
        firstCard = null
      }
    }

    if (!board.find(card => !card.matched)) {
      gameOver = true
    }

    this.setState({ board, firstCard, gameOver, wait })
  }

  render() {
    const { gameSeed, gameOver } = this.state

    return (
      <div className="game">
        {this.state.board.map((card, ndx) => (
          <Card
            click={this.flipCard}
            {...card}
            ndx={ndx}
            key={`card-${ndx * gameSeed}`}
            gameOver={gameOver}
          />
        ))}
        <button onClick={this.loadCards}>
          {gameOver ? 'Play Again' : 'Reset'}
        </button>
      </div>
    )
  }
}

export default Game
