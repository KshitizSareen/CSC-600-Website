// 3rd party
import { List, Map } from 'immutable';
import { DrumsInstrument } from './instruments/KshitizSareen';
import { WindInstruments } from './instruments/sroy97';

// project dependencies
import { PianoInstrument} from './instruments/Piano';
import { XylophoneInstrument } from './instruments/JasJahan';
import { KalimbaInstrument } from './instruments/thaoHo618';
import { WaveformVisualizer } from './visualizers/Waveform';
import { BoxVisualizer } from './visualizers/JasJahan_3D';


import { CircleVisualizer } from './visualizers/thaoHo618'; 
import { EllipticalVisualizer } from './visualizers/sroy97';
import { BarCircleVisualizer} from './visualizers/KshitizSareen';
/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;


const instruments = List([PianoInstrument,DrumsInstrument,XylophoneInstrument,WindInstruments,KalimbaInstrument]);
const visualizers = List([WaveformVisualizer,CircleVisualizer,EllipticalVisualizer,BarCircleVisualizer,BoxVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
