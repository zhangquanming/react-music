import { connect } from 'react-redux';
import { setSkin } from '../redux/actions';
import Skin from '../views/setting/Skin';

const mapStateToProps = state => {
  return {
    currentSkin: state.skin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSkin: skin => {
      dispatch(setSkin(skin));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skin);
