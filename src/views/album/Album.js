import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from '../../components/header/Header';
import Scroll from '../../components/scroll/Scroll';
import Loading from '../../components/loading/Loading';

import { getAlbumInfo } from '../../api/recommend';
import { getSongVKey } from '../../api/song';
import { CODE_SUCCESS } from '../../api/config';
import * as AlbumModel from '../../models/album';
import * as SongModel from '../../models/song';

import style from './album.styl?module';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.albumBgRef = React.createRef();
    this.albumContainerRef = React.createRef();
    this.albumFixedBgRef = React.createRef();
    this.playButtonWrapperRef = React.createRef();

    this.state = {
      show: false,
      loading: true,
      album: {},
      songs: [],
    };
  }

  componentDidMount() {
    this.setState({
      show: true,
    });
    this.albumContainerRef.current.style.top = this.albumBgRef.current.offsetHeight + 'px';
    getAlbumInfo(this.props.match.params.id).then(res => {
      if (res && res.code === CODE_SUCCESS) {
        let album = AlbumModel.createAlbumByDetail(res.data);
        album.desc = res.data.desc;

        let songList = res.data.list;
        let songs = [];
        songList.forEach(item => {
          let song = SongModel.createSong(item);
          // 获取歌曲vkey
          this.getSongUrl(song, item.songmid);
          songs.push(song);
        });
        this.setState({
          loading: false,
          album: album,
          songs: songs,
        });
      }
    });
  }

  getSongUrl(song, mId) {
    getSongVKey(mId).then(res => {
      if (res && res.code === CODE_SUCCESS) {
        if (res.data.items) {
          let item = res.data.items[0];
          song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
        }
      }
    });
  }
  /**
   * 监听scroll
   */
  scroll({ y }) {
    let albumBgDOM = this.albumBgRef.current;
    let albumFixedBgDOM = this.albumFixedBgRef.current;
    let playButtonWrapperDOM = this.playButtonWrapperRef.current;
    if (y < 0) {
      if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
        albumFixedBgDOM.style.display = 'block';
      } else {
        albumFixedBgDOM.style.display = 'none';
      }
    } else {
      let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
      albumBgDOM.style.webkitTransform = transform;
      albumBgDOM.style.transform = transform;
      playButtonWrapperDOM.style.marginTop = `${y}px`;
    }
  }

  render() {
    let album = this.state.album;
    let imgStyle = {};
    if (album.img) {
      imgStyle.backgroundImage = `url(${album.img})`;
    }
    let songs = this.state.songs.map(song => {
      return (
        <div className={style.song} key={song.id}>
          <div className="song-name">{song.name}</div>
          <div className="song-singer">{song.singer}</div>
        </div>
      );
    });
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="music-album">
          <Header title={album.name}></Header>
          <div style={{ position: 'relative' }}>
            <div ref={this.albumBgRef} className={style.albumImg} style={imgStyle}>
              <div className={style.filter}></div>
            </div>
            <div ref={this.albumFixedBgRef} className={style.albumImg + ' ' + style.fixed} style={imgStyle}>
              <div className={style.filter}></div>
            </div>
            <div ref={this.playButtonWrapperRef} className={style.playWrapper}>
              <div className={style.playButton}>
                <i className="icon-play"></i>
                <span>播放全部</span>
              </div>
            </div>
          </div>
          <div ref={this.albumContainerRef} className={style.albumContainer}>
            <div className={style.albumScroll} style={this.state.loading === true ? { display: 'none' } : {}}>
              <Scroll onScroll={this.scroll.bind(this)}>
                <div className={`${style.albumWrapper} skin-detail-wrapper`}>
                  <div className={style.songCount}>专辑 共{songs.length}首</div>
                  <div className={style.songList}>{songs}</div>
                  <div className={style.albumInfo} style={album.desc ? {} : { display: 'none' }}>
                    <h1 className={style.albumTitle}>专辑简介</h1>
                    <div className={style.albumDesc} dangerouslySetInnerHTML={{ __html: album.desc }}></div>
                  </div>
                </div>
              </Scroll>
            </div>
            <Loading title="正在加载..." show={this.state.loading} />
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Album;
