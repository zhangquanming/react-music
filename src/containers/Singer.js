import { connect } from 'react-redux';
import { showPlayer, changeSong, setSongs } from '../redux/actions';
import Singer from '../views/singer/Singer';

const mapDispatchToProps = dispatch => {
  return {
    showMusicPlayer: status => {
      dispatch(showPlayer(status));
    },
    changeCurrentSong: song => {
      dispatch(changeSong(song));
    },
    setSongs: songs => {
      dispatch(setSongs(songs));
    },
  };
};

export default connect(null, mapDispatchToProps)(Singer);
