// 3rd party
import { List, Map, fromJS } from 'immutable';

// project deps
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * All user input is handled by DispatchAction.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 * 'songs': List<string>
 * 'notes': List<{id: number, songTitle: string, notes: string}>
 */
type DispatchArgs = {
  [key: string]: any;
};

// A simple algebraic data-type with string literal types
type DispatchActionType =
  | 'SET_SOCKET'
  | 'DELETE_SOCKET'
  | 'SET_SONGS'
  | 'PLAY_SONG'
  | 'STOP_SONG'
  | 'SET_LOCATION'
  | 'SHOW_SONG_DETAILS' 
  | 'SET_ALBUMS'
  | 'SET_ALBUM_SONGS'
  | 'SET_GENRES'
  | 'SET_GENRE_SONGS'
  | 'SEARCH_SONGS';

export class DispatchAction {
  readonly type: DispatchActionType;
  readonly args: Map<string, any>;

  constructor(type: DispatchActionType, args?: DispatchArgs) {
    this.type = type;
    this.args = fromJS(args) as Map<string, any>;
  }
}

/** ------------------------------------------------------------------------ **
 * Top-level application reducer.
 ** ------------------------------------------------------------------------ */

export function appReducer(state: AppState, action: DispatchAction): AppState {
  const { type, args } = action;

  console.debug(`${type}`);

  // Question: Does this function remind of you registering callbacks?
  const newState = (() => {
    switch (type) {
      case 'SET_SOCKET': {
        const oldSocket = state.get('socket');
        if (oldSocket) {
          oldSocket.close();
        }

        return state.set('socket', args.get('socket'));
      }
      case 'DELETE_SOCKET': {
        return state.delete('socket');
      }
      case 'SET_SONGS': {
        const songs = args.get('songs');
        return state.set('songs', songs);
      }
      case 'PLAY_SONG': {
        const notes = state
          .get('songs')
          .find((s: any) => s.get('id') === args.get('id'))
          .get('notes');
        return state.set('notes', notes);
      }
      case 'STOP_SONG': {
        return state.delete('notes');
      }
      case 'SET_LOCATION': {
        const pathname = args.getIn(['location', 'pathname'], '') as string;
        const search = args.getIn(['location', 'search'], '') as string;

        const instrumentName: string = pathname.substring(1);
        const visualizerName: string =
          new URLSearchParams(search.substring(1)).get('visualizer') ?? '';
        const instruments: List<Instrument> = state.get('instruments');
        const visualizers: List<Visualizer> = state.get('visualizers');

        const instrument = instruments.find(i => i.name === instrumentName);
        const visualizer = visualizers.find(v => v.name === visualizerName);

        return state
          .set('instrument', instrument)
          .set('visualizer', visualizer);
      }

      case 'SHOW_SONG_DETAILS':{
        const SongDetail = args.get('SongDetail');
        return state.set('SongDetail',SongDetail);
      }

      case 'SET_ALBUMS':{
        let Albums : List<any> = args.get('albums',List());
        return state.set('Albums',Albums);
      }

      case 'SET_ALBUM_SONGS':{
        let Albums : List<any> =args.get('Albums',List())
        let index : number = args.get('index',Number);
        return state.set('FilteredSongs',Albums.get(index).get('songs'));
      }

      case 'SET_GENRES':{
        let Genres : List<any> = args.get('genres',List());
        return state.set('Genres',Genres);
      }

      case 'SET_GENRE_SONGS':{
        let Genres : List<any> = args.get('Genres',List());
        let index: number = args.get('index',Number);
        return state.set('FilteredSongs',Genres.get(index).get('songs'));
      }

      case 'SEARCH_SONGS':{
        let SearchText : String = args.get('search',String());
        let songs : List<any> = args.get('songs',List());
        let FilteredSongs : any[] = [];
        songs.forEach(song=>{
          let songTitle : String = song.get('songTitle').toLowerCase().trim();
          if(songTitle.includes(SearchText.toLowerCase().trim()))
          {
            FilteredSongs.push(song);
          }
        })
        return state.set('FilteredSongs',FilteredSongs);
      }

      default:
        console.error(`type unknown: ${type}\n`, args.toJS());
        return state;
    }
  })();

  console.debug(newState.update('socket', s => (s ? '[socket]' : s)).toJS());

  return newState;
}
