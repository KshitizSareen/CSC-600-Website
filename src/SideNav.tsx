// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import { send } from './Socket';


/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--light-gray pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {

  async function setSongDetails(song: { get: (arg0: string) => any; })
  {
    const socket = state.get('socket');
            const {SongDetails}  = await send(socket,'get_song_details',{});
            const songGenre=song.get('fkGenreid');
            const songAlbum=song.get('fkAlbumid');
            const songArtist=song.get('fkArtistid');
            let genre : string = "";
            let album : string = "";
            let artist: string = "";
            for(let i=0;i<SongDetails.length;i++)
            {
              if(SongDetails[i].genreId===songGenre)
              {
                genre=SongDetails[i].genreDescription;
              }
              if(SongDetails[i].albumId===songAlbum)
              {
                album=SongDetails[i].albumTitle;
              }
              if(SongDetails[i].artistId===songArtist)
              {
                artist=SongDetails[i].artistName;
              } 
            }
            const SongDetail={
              genre: genre,
              album: album,
              artist: artist
            }
            dispatch(new DispatchAction('SHOW_SONG_DETAILS',{SongDetail}));
  }

  const songs: List<any> = state.get('songs', List());
  return (
    <Section title="Playlist">
      {songs.map(song => (
        <div
          key={song.get('id')}
          className="f6 pointer underline flex items-center no-underline i dim"
          onClick={async () =>
            {
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
            setSongDetails(song);
            }
          }
        >
          <Music20 className="mr1" />
          {song.get('songTitle')}
        </div>
      ))}
    </Section>
  );
}

function SongDetails({state,dispatch} : SideNavProps) : JSX.Element{

  const SongDetail= state.get('SongDetail');
  return(
    <Section title="Song Details">
      <div>
      {
        SongDetail!==undefined ? SongDetail.get('genre') : ""
      }
      </div>
      <div>
      {
        SongDetail!==undefined ? SongDetail.get('album') : ""
      }
      </div>
      <div>
      {
        SongDetail!==undefined ? SongDetail.get('artist') : ""
      }
      </div>
    </Section>
  )
}

function Albums({state,dispatch} : SideNavProps) : JSX.Element
{
  const Albums : List<any> = state.get('Albums',List());
  return(
    <Section title="Albums">
      {
        Albums.map((album,index)=>{
          return(
            <div 
            key={album.get('albumID')}
            className="f6 pointer underline items-center no-underline i dim"
            onClick={()=>{
              dispatch(new DispatchAction('SET_ALBUM_SONGS',{index,Albums}));
            }}
            >
              {
              album.get('albumTitle')
              }
            </div>

          )
        })
      }
    </Section>
  )
}

function Genres({state,dispatch} : SideNavProps) : JSX.Element
{
  const Genres : List<any> = state.get('Genres',List());
  return(
    <Section title="Genres">
      {
        Genres.map((genre,index)=>{
          return(
            <div 
            key={genre.get('genreId')}
            className="f6 pointer underline items-center no-underline i dim"
            onClick={()=>{
              dispatch(new DispatchAction('SET_GENRE_SONGS',{index,Genres}));
            }}
            >
              {
              genre.get('genreDescription')
              }
            </div>

          )
        })
      }
    </Section>
  )
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Nameless App
      </div>
      <div className="flex-auto" style={{
        overflow: 'scroll'
      }}>
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
        <SongDetails state={state} dispatch={dispatch} />
        <Albums state={state} dispatch={dispatch} />
        <Genres state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
