/*
    Author: Jasmine Jahan
    GitHub Handle: jasjahan
    Xylophone.tsx: Adding Xylophone Instrument
*/

import * as Tone from 'tone';
import styles from './Xylo.module.css'; 
import { Instrument } from "../Instruments"
import pan3 from '../../src/img/mallet.png';


function Xylophone(){
    const tonePlayers = ['/XyloSounds/c.wav', 
                        '/XyloSounds/d1.wav',
                        '/XyloSounds/e1.wav',
                        '/XyloSounds/f.wav',
                        '/XyloSounds/g.wav',
                        '/XyloSounds/a.wav',
                        '/XyloSounds/b.wav',
                        '/XyloSounds/c2.wav']

    const names = ['c', 'd1', 'e1', 'f', 'g', 'a', 'b', 'c2']
    

  function ExecuteSound(index: any) : void {
      const tonePlayer = new Tone.Player(tonePlayers[index]);
      tonePlayer.autostart=true;
      tonePlayer.toDestination();
    }

        return(
            <body tabIndex={0}>
              <div className={styles.page}>
                <img src={pan3}  width={300}  height={250}  alt="NO IMG"/> 
                  {names.map((names, index, props:any)=>{
                    return(
                     <div className={styles.xylophone}>
                         <button className={styles.playbutton} 
                                 style = {{height: ( 200 - (15 * index )) + 'px'}}
                                 onClick={()=>{ ExecuteSound(index);}}>
                                    <div className = {styles.circle}/>
                                        {names} 
                                    <div className = {styles.circle}/>
                          </button>
                     </div>
                     ) 
                   })
                  }
          {/* <PlayButton notes = {notes[0]}/>
          <PlayButton notes = {notes[1]}/>
          <PlayButton notes = {notes[2]}/>
          <PlayButton notes = {notes[3]}/>
          <PlayButton notes = {notes[4]}/>
          <PlayButton notes = {notes[5]}/>
          <PlayButton notes = {notes[6]}/>
          <PlayButton notes = {notes[7]}/> */}

          {/* <button onClick = {()=> new Audio(notes[0].file).play()}>c</button>
          <button onClick = {()=> new Audio(notes[1].file).play()}>d1</button>
          <button onClick = {()=> new Audio(notes[2].file).play()}>e1</button>
          <button onClick = {()=> new Audio(notes[3].file).play()}>f</button>
          <button onClick = {()=> new Audio(notes[4].file).play()}>g</button>
          <button onClick = {()=> new Audio(notes[5].file).play()}>a</button>
          <button onClick = {()=> new Audio(notes[6].file).play()}>b</button>
          <button onClick = {()=> new Audio(notes[7].file).play()}>c2</button> */}
              </div>
            </body>
          )
  };   


export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);



