import React, {Component, PropTypes} from 'react';

export default class CameraPicture extends Component {
  render() {
    const picPath = '/public/images/pictures/' + this.props.src;
    const style = {
      backgroundImage: "url(" + picPath + ")",
    };
    return (
      <div className="camera-picture" style={style}/>
    );
  }

  static propTypes = {
    src: PropTypes.string,
  };
}
