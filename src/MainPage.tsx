// 3rd party library imports
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';

// project imports
import { InstrumentContainer } from './Instruments';
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { VisualizerContainer } from './Visualizers';
import { List } from 'immutable';



type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

/** ------------------------------------------------------------------------ **
 * Instrument and visualizer component
 ** ------------------------------------------------------------------------ */

function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div>
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}

function InstrumentAndVisualizer({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column"
      style={{ left: '16rem' }}
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
    </div>
  );
}

function ShowWelcome({ state, dispatch }: PanelProps): JSX.Element {
  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center"
      style={{ left: '16rem' }}  >  
      <div className="mw6 lh-copy mb4">
        <Music32 />
        <div className="f3 fw7 mb2">Welcome to the case study.</div>
        <div className="f4 mb3">
          Select an instrument and a visualizer on the left to serve some fresh beats.
        </div>
        {/* <div className="f5">The UI is yours to design. Express yourself.</div> */}
        <ShowSongs state={state} dispatch={dispatch}/>
      </div>
    </div>
  );
}

function ShowSongs({ state, dispatch }: PanelProps) : JSX.Element {

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;


  const [synth, setSynth] = useState(
    new Tone.Synth({
      oscillator: { type: 'amsawtooth' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );
  
  const [search,setSearch] = useState("");

  const notes = state.get('notes');

  const songs: List<any> = state.get('songs', List());
  useEffect(() => {
    if(search!=="")
    {
      dispatch(new DispatchAction('SEARCH_SONGS',{search,songs}));
    }

    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {};
  }, [notes, synth, search, songs, dispatch]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };


  const FilteredSongs : List<any> = state.get('FilteredSongs',List());
  return(
    <div>
      <input  className="input-reset ba b--black-20 pa2 mb2 db w-100" placeholder="Enter Song Title"  value={search} onChange={(value)=>{
        setSearch(value.target.value);
      }}></input>
    <div 
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}
    >
      <div style={{
        marginTop: '5%',
      }}>  Search Results by Song Tittle
      {
       FilteredSongs !== undefined ?
       FilteredSongs.map(song=>{
         return(
           <div
           className="f6 pointer underline items-center no-underline i dim"
            onClick={()=>{
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
           }}>
             {
               song.get('songTitle')
             }
             </div>
         )
       }) : null

}
</div> 
<div style={{
        marginTop: '5%',
      }}>
        Oscillators List
        {oscillators.map(o => (
          <div
          className="f6 pointer underline items-center no-underline i dim"
          onClick={() => setOscillator(o)}
          style={{
            margin: '1%'
          }}
          >
            {
              o
            }
            </div>
        ))}
      </div>
    </div>
    </div>
  )
}

/** ------------------------------------------------------------------------ **
 * Main page component
 ** ------------------------------------------------------------------------ */

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles together the entire main page.
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');
  console.log('INSTRUMENT', isWelcome);

  useEffect(() => {
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className="fixed top-0 left-0 h-100 w-100 bg-white"
      onClick={() => Tone.start()}
    >
      <SideNav state={state} dispatch={dispatch} />
      {isWelcome ? (
        <ShowWelcome state={state} dispatch={dispatch}/>
      ) : (
        <InstrumentAndVisualizer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

