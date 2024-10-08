// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapseInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapseInSeconds} = this.state
    const isBtnDisabled = timeElapseInSeconds > 0

    return (
      <div className="timer-limit-control-cont">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-control">
          <button
            className="limit-control-button"
            disabled={isBtnDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-cont">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-control-button"
            disabled={isBtnDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapseInSeconds = () => {
    const {timerLimitInMinutes, timeElapseInSeconds} = this.state
    const isTimerCompleted = timeElapseInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapseInSeconds: prevState.timeElapseInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapseInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapseInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapseInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapseInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseImgAlt = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-control-cont">
        <button
          className="timer-control-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseImgAlt}
            className="timer-control-icon"
          />
          <p className="timer-control-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          className="timer-control-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-control-icon"
          />
          <p className="timer-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapseInSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapseInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-cont">
        <h1 className="head">Digital Timer</h1>

        <div className="digital-timer-cont">
          <div className="timer-dislay-cont">
            <div className="elapsed-time-cont">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="control-cont">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
