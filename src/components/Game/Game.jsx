import React, { Component } from 'react'
import Card from '../Card/Card'
import emoji from '../../emoji'
import './game.scss'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: new Array(64).fill(0)
    }

    this.click = this.click.bind(this)
  }

  componentDidMount() {
    this.loadCards()
  }

  loadCards() {
    const emojis1 = new Array(32).fill(0).map(() => this.randomEmoji())
    const emojis2 = this.shuffle(emojis1)
    const emojis = [...emojis1, ...emojis2]

    const { board } = this.state
    for (let ndx in board) {
      board[ndx] = { icon: emojis[ndx], rotated: false }
    }

    this.setState({ board })
  }

  shuffle(array) {
    let counter = array.length

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter)

      // Decrease counter by 1
      counter--

      // And swap the last element with it
      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
  }

  randomEmoji() {
    return emoji[Math.floor(Math.random() * emoji.length)]
  }

  click(clickedCard) {
    console.log({ clickedCard })

    const { board } = this.state
    const card = board.find(c => c === clickedCard)
    card.rotate = !card.rotate
    this.setState({ board })
  }

  render() {
    return (
      <div className="game">
        {this.state.board.map((card, ndx) => (
          <Card click={this.click} {...card} key={`card-${ndx}`} />
        ))}
      </div>
    )
  }
}

export default Game
