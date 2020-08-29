import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, useParams } from 'react-router-dom';
import { fetchQuestions } from '../redux/trivia';
import { Spinner } from 'reactstrap';

import ScoreModal from './Modal';

export class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberCorrect: 0,
      loading: true,
    };
    this.handleChoice = this.handleChoice.bind(this);
  }
  componentDidMount = async () => {
    const {
      match: { params },
    } = this.props;

    await this.props.getQuestions(params.category);

    this.setState({
      loading: false,
    });
  };
  handleChoice(choice, result, buttonId) {
    let button = document.getElementById(buttonId);

    if (button && choice === result.correct_answer) {
      this.setState({ numberCorrect: this.state.numberCorrect + 1 });
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
      button.disabled = true;
    } else {
      button.style.backgroundColor = 'red';
    }
    for (let i = 0; i < 4; i++) {
      let id = buttonId[0] + '-' + i;
      let element = document.getElementById(id);

      this.markCorrectAnswer(element, result.correct_answer);
      element.disabled = true;
    }
  }

  markCorrectAnswer(element, correctAnswer) {
    if (
      element.innerHTML === correctAnswer ||
      element.getAttribute('choice') === correctAnswer
    ) {
      element.style.backgroundColor = 'green';
    }
  }

  render() {
    const results = this.props.results.results;

    return (
      <div className="questions-wrapper trivia" key={results}>
        <nav>
          <NavLink className="nav-link" to="/">
            X
          </NavLink>
        </nav>
        {this.state.loading ? (
          <Spinner
            color="dark"
            style={{
              width: '4rem',
              height: '4rem',
            }}
          />
        ) : results && results.length ? (
          results.map((result, questionIndex) => (
            <div className="question" key={result.question}>
              <h2>
                {questionIndex +
                  1 +
                  '. ' +
                  result.question
                    .replace(/(&quot\;)/g, '"')
                    .replace(/&#039;/g, "'")
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')}
              </h2>

              <form id="choice-form">
                {result.shuffledAnswers.map((choice, buttonIndex) => (
                  <div key={choice.incorrect_answers}>
                    <button
                      disabled={false}
                      type="button"
                      className="choice"
                      choice={choice}
                      dangerouslySetInnerHTML={{ __html: choice }}
                      id={questionIndex + '-' + buttonIndex}
                      onClick={() => {
                        this.handleChoice(
                          choice,
                          result,
                          questionIndex + '-' + buttonIndex
                        );
                      }}
                    >
                      {/* {choice
                            .replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'")
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&lrm;/g, '')
                            .replace(/&oacute;/g, 'ó')} */}
                    </button>
                  </div>
                ))}
              </form>
            </div>
          ))
        ) : (
          <div>
            <h2>A category has not been selected yet.</h2>
          </div>
        )}
        {!this.state.loading && results && results.length && (
          <ScoreModal
            buttonLabel="Check Your Score"
            score={this.state.numberCorrect * 10}
          />
        )}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    results: reduxState.results,
  };
};

const mapDispatch = (dispatch) => ({
  getQuestions: (category) => dispatch(fetchQuestions(category)),
});

export default withRouter(connect(mapState, mapDispatch)(Questions));
