import React from 'react';
import { Route } from 'react-router-dom';
import Alert from './Alert';
import CoinFlip from './CoinFlip';
import RollUnder from './RollUnder';


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertDict: {},
    };
  }

  showMessage(classType, message) {
    const alertDict = { classType, message };
    this.setState({ alertDict });
  }

  showWarningMessage(message) {
    const classType = 'warning';
    this.showMessage(classType, message);
  }

  render() {
    const { alertDict } = this.state;
    return (
      <div className="container">
        <Alert classType={alertDict.classType} message={alertDict.message} />
        <Route
          path="/"
          exact
          render={() => (
            <RollUnder
              showMessage={(classType, message) => this.showMessage(classType, message)}
              showWarningMessage={message => this.showWarningMessage(message)}
            />
          )}
        />
        <Route
          path="/coin-flip"
          render={() => (
            <CoinFlip
              showMessage={(classType, message) => this.showMessage(classType, message)}
              showWarningMessage={message => this.showWarningMessage(message)}
            />
          )}
        />

      </div>
    );
  }
}

export default Container;
