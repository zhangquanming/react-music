import { connect } from 'react-redux';
import { showPlayer, changeSong, setSongs } from '../redux/actions';
import Album from '../views/album/Album';

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

export default connect(null, mapDispatchToProps)(Album);
