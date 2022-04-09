import { useState}  from "react";
import { Instrument } from "../Instruments"
import "./Drums.css"
import * as Tone from 'tone';
function Drums()
{
    const tonePlayers=["/drumsounds/clap.wav","/drumsounds/crash.wav","/drumsounds/open-hihat.wav","/drumsounds/kick.wav","/drumsounds/snare.wav","/drumsounds/closed-hihat.wav"]
    const Icons=["clap.png","crash.png","open-hihat.png","kick.png","snare.png","closed-hihat.png"]
    const [properties,setProperties] = useState([{
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    },{
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    },
    {
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    },
    {
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    },
    {
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    },
    {
        playBackRate: 1,
        volume: 1,
        reverb: 0,
        steroe: 0.5
    }])

    function ExecuteSound(index: any) : void
    {
        const tonePlayer = new Tone.Player(tonePlayers[index]);
        tonePlayer.autostart=true;
        tonePlayer.playbackRate=properties[index].playBackRate;
        if(properties[index].volume===0)
        {
            tonePlayer.mute=true;
        }
        else
        {
            tonePlayer.mute=false;
            tonePlayer.volume.value=properties[index].volume;
        }
        if(properties[index].reverb!==0)
        {
        const Reverb = new Tone.Reverb(properties[index].reverb).toDestination();
        tonePlayer.connect(Reverb);
        }
        if(properties[index].steroe>=0)
        {
            const Stereo = new Tone.StereoWidener(properties[index].steroe/2).toDestination();
            tonePlayer.connect(Stereo);
        }
        tonePlayer.toDestination();
    }

    return(
        <body tabIndex={0}>
            <div className="drumkit">
            {
                        Icons.map((icon,index)=>{
                            return(
                                <div className="padcontainer">
                <div className="pad"  onClick={()=>{
                    ExecuteSound(index);
                }}>
                    <img className="icon" src={"/icons/"+icon} alt="clap"/>
                </div>
                    <label>Playback Rate</label>
                    <input type="range" min="0" max="5" value={properties[index].playBackRate} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.playBackRate=Number.parseInt(value.target.value)
                            }
                            return(
                                property
                            )
                        }))
                    }}/>
                    <label>Volume</label>
                    <input type="range" min="0" max="10" value={properties[index].volume} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.volume=Number.parseInt(value.target.value)
                            }
                            return(
                                property
                            )
                        }))
                    }}/>
                    <label>Reverb</label>
                    <input type="range" min="0" max="10" value={properties[index].reverb} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.reverb=Number.parseInt(value.target.value)
                            }
                            return(
                                property
                            )
                        }))
                    }}/>
                    <label>Stereo</label>
                    <input type="range" min="0" step={1} max="2" value={properties[index].steroe} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.steroe=Number.parseInt(value.target.value);
                            }
                            return(
                                property
                            )
                        }))
                    }}/>
                    </div>
                            )
                        })
                    }
            </div>
        </body>
    )
};

export const DrumsInstrument = new Instrument("Drums",Drums);