import {Component} from 'react'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    userChoice: null,
    opponentChoice: null,
    score: 0,
    gameResult: null,
    showRules: false,
    isPlaying: false,
  }

  handleChoiceClick = choice => {
    // Generate a random opponent choice
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    const opponentChoice = choicesList[randomIndex]

    // Determine the game result
    let gameResult
    if (choice.id === opponentChoice.id) {
      gameResult = 'IT IS DRAW'
    } else if (
      (choice.id === 'ROCK' && opponentChoice.id === 'SCISSORS') ||
      (choice.id === 'SCISSORS' && opponentChoice.id === 'PAPER') ||
      (choice.id === 'PAPER' && opponentChoice.id === 'ROCK')
    ) {
      gameResult = 'YOU WON'
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      gameResult = 'YOU LOSE'
      this.setState(prevState => ({score: prevState.score - 1}))
    }

    this.setState({
      userChoice: choice,
      opponentChoice,
      gameResult,
      isPlaying: true,
    })
  }

  handlePlayAgain = () => {
    this.setState({
      userChoice: null,
      opponentChoice: null,
      gameResult: null,
      isPlaying: false,
    })
  }

  toggleRulesPopup = () => {
    this.setState(prevState => ({
      showRules: !prevState.showRules,
    }))
  }

  render() {
    const {
      userChoice,
      opponentChoice,
      gameResult,
      score,
      showRules,
      isPlaying,
    } = this.state

    return (
      <div className="bg-container">
        <h1>Rock Paper Scissors</h1>
        <div className="app-container">
          <div className="button-container">
            {isPlaying ? null : (
              <>
                {choicesList.map(eachChoise => (
                  <button
                    type="button"
                    className="btn"
                    data-testid={eachChoise.id}
                  >
                    {eachChoise.id}
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="score-container">
            <p>Score</p>
            <p className="score" data-testid="score">
              {score}
            </p>
          </div>
        </div>

        <div className="game-container">
          <div>
            {choicesList.map(choice => (
              <button
                type="button"
                data-testid={`${choice.id.toLowerCase()}Button`}
                className="btn"
                key={choice.id}
                onClick={() => this.handleChoiceClick(choice)}
              >
                <img src={choice.imageUrl} alt={choice.id} />
              </button>
            ))}
          </div>
          <div>
            {isPlaying && userChoice && opponentChoice && gameResult && (
              <div className="GameResultView d-flex flex-row">
                <h1>You</h1>
                <img
                  src={userChoice.imageUrl}
                  alt="Your Choice"
                  className="image"
                />
                <h1>Opponent</h1>
                <img
                  src={opponentChoice.imageUrl}
                  alt="Opponent Choice"
                  className="image"
                />
                <p>{gameResult}</p>
                <button
                  type="button"
                  data-testid="playAgainButton"
                  onClick={this.handlePlayAgain}
                >
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="rulesBtn">
          <button
            type="button"
            data-testid="rulesButton"
            onClick={this.toggleRulesPopup}
          >
            Rules
          </button>
          {showRules && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="image"
                data-testid="rulesImage"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
