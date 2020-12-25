import React from 'react';
import PropTypes from 'prop-types';
import loadingImg from './loading.gif';
import style from './loading.styl?module';

class Loading extends React.Component {
  render() {
    let displayStyle =
      this.props.show === true ? { display: '' } : { display: 'none' };
    return (
      <div className={style.loadingContainer} style={displayStyle}>
        <div className={style.loadingWrapper}>
          <img src={loadingImg} width="18px" height="18px" alt="loading" />
          <div className={style.loadingTitle}>{this.props.title}</div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
};

export default Loading;
