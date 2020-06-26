import React from 'react';
// import App from '../../App';
import '../../App.css'
import './index.css';

class Body extends React.Component {
  render() {
    return (
      <div className="Body">
        {this.props.valueFromParent}
      </div>
    );
  }
}

export default Body;