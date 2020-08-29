import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/trivia';
import { withRouter, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

export class Home extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('event', event);
    // console.log('e', e);
    this.props.getQuestions(event.target.value);
  }

  render() {
    return (
      <div className="trivia">
        <div>
          <h1 className="header">
            Ready to test your trivia skills? Select a category to begin.
          </h1>
          <div id="category">
            <div>
              <NavLink to="/questions">
                <Button
                  type="button"
                  color="success"
                  // style={{ backgroundColor: '#28a745' }}
                  value="geography"
                  onClick={this.handleClick}
                >
                  Geography
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  // style={{ backgroundColor: '#dc3545' }}
                  color="danger"
                  size="large"
                  value="games"
                  onClick={this.handleClick}
                >
                  Games
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  value="animals"
                  color="primary"
                  onClick={this.handleClick}
                >
                  Animals
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/questions">
                <Button
                  value="computers"
                  // style={{ backgroundColor: '#6c757d' }}
                  color="secondary"
                  onClick={this.handleClick}
                >
                  Computers
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  value="history"
                  // style={{ backgroundColor: '#ffc107' }}
                  color="warning"
                  onClick={this.handleClick}
                >
                  History
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  value="tv"
                  // style={{ backgroundColor: '#17a2b8' }}
                  color="info"
                  onClick={this.handleClick}
                >
                  TV
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/questions">
                <Button
                  value="music"
                  className="music"
                  // style={{ backgroundColor: '#6A5ACD' }}
                  onClick={this.handleClick}
                >
                  Music
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  value="books"
                  className="books"
                  // style={{ backgroundColor: '#FF7F50', color: 'black' }}
                  onClick={this.handleClick}
                >
                  Books
                </Button>
              </NavLink>
              <NavLink to="/questions">
                <Button
                  value="sports"
                  className="sports"
                  // style={{ backgroundColor: '#8B0000' }}
                  onClick={this.handleClick}
                >
                  Sports
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
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

export default withRouter(connect(mapState, mapDispatch)(Home));
