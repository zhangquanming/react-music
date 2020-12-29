import { combineReducers } from 'react';
import * as ActionTypes from './actionTypes';

/**
 * reducer就是一个纯函数，接收旧的state和action，返回新的state
 */

//需要存储的初始状态数据
const initialState = {
  showStatus: false,
  song: {},
  songs: [],
};

// 显示或隐藏播放状态
function showStatus(showStatus = initialState.showStatus, action) {
  switch (action.type) {
    case ActionTypes.SHOW_PLAYER:
      return action.showStatus;
    default:
      return showStatus;
  }
}

// 修改当前歌曲
function song(song = initialState.song, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_SONG:
      return action.song;
    default:
      return song;
  }
}

// 添加或移除歌曲
function songs(songs = initialState.songs, action) {
  switch (action.type) {
    case ActionTypes.SET_SONGS:
      if (action.songs.length > 1) {
        return action.songs;
      } else {
        let newSongs = [...songs];
        let addSong = action.songs[0];
        let index = newSongs.findIndex(song => song.id === addSong.id);
        if (index === -1) {
          newSongs.push(addSong);
        }
        return newSongs;
      }
    case ActionTypes.REMOVE_SONG_FROM_LIST: {
      let newSongs = songs.filter(song => song.id !== action.id);
      return newSongs;
    }
    default:
      return songs;
  }
}

// 合并Reducer
const reducer = combineReducers({
  showStatus,
  song,
  songs,
});

export default reducer;
