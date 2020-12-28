import React from 'react';
import style from './header.styl?module';

class Header extends React.Component {
  handleClick() {
    console.log(this);
    window.history.back();
  }

  render() {
    return (
      <div className={style.musicHeader}>
        <span className={style.headerBack} onClick={this.handleClick.bind(this)}>
          <i className="icon-back"></i>
        </span>
        <div className={style.headerTitle}>{this.props.title}</div>
      </div>
    );
  }
}

export default Header;
