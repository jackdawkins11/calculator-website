'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    let liked = this.state.liked;

    let message = liked ? 'You like this' : 'You don\' like this';

    return (
      <button onClick={() => this.setState({ liked: !liked })}>
        {message}
      </button>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);