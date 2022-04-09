// 3rd party library imports
import * as Tone from 'tone';

// project imports
import styles from './Kalimba.module.css'; 
import { Instrument } from "../Instruments"

function Kalimba(){
  const tonePlayers = [ '/KalimbaSounds/B.wav', 
                        '/KalimbaSounds/G.wav',
                        '/KalimbaSounds/E.wav',
                        '/KalimbaSounds/C.wav',
                        '/KalimbaSounds/A.wav',
                        '/KalimbaSounds/F.wav',
                        '/KalimbaSounds/D.wav',
                        '/KalimbaSounds/C.wav']

  const notes = ['B', 'G', 'E', 'C', 'A', 'F', 'D', 'C']
  const notes2 = ['E', 'G', 'B', 'D', 'F', 'A', 'C']

  function ExecuteSound(index: any) : void {
    const tonePlayer = new Tone.Player(tonePlayers[index]);
    tonePlayer.autostart=true;
    tonePlayer.toDestination();
  }
  
  return(
      <body tabIndex={0}>
        <div className={styles.page}> 
          {notes.map((notes, index, props:any)=> {
            return(
              <div className={styles.kalimba}>
                  <button className={styles.playbutton}           
                    style = {{height: ( (30 * index * 2) + (200))}}
                    onClick={()=>{ ExecuteSound(index);}}>
                    <div/>{notes}<div/>
                  </button>    
              </div>
              )})
          }

          {notes2.map((notes2, index, props:any)=> {
            return(
              <div className={styles.kalimba}>
                <button className={styles.playbutton} 
                  style = {{height: (540 - (35 * index * 2))}}
                  onClick={()=>{ ExecuteSound(index);}}>
                    <div/>{notes2}<div/>
                </button>
              </div>
              )})
          }
        </div>
      </body>
    )
  };   

export const KalimbaInstrument = new Instrument("Kalimba", Kalimba);