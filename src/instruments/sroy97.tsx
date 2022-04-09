/*
    Author: Saptarshi Roy
    Github Handle: sroy97
 */

import {useState}  from "react";
import { Instrument } from "../Instruments";
import "./WindInstruments.css";
import * as Tone from 'tone';
function WindInstrument()
{
    const windIcons =["clarinet.png",
                      "flute.png",
                      "horn.png",
                      "oboe.png",
                      "piccolo.png",
                      "saxophone.png",
                      "trombone.png",
                      "trumpet.png",
                      "tuba.png"]

    const tonePlayers=["/WindSounds/clarinet.wav",
                       "/WindSounds/flute.wav",
                       "/WindSounds/horn.wav",
                       "/WindSounds/oboe.wav",
                       "/WindSounds/piccolo.wav",
                       "/WindSounds/sax.wav",
                       "/WindSounds/trombone.wav",
                       "/WindSounds/trumpet.wav",
                       "/WindSounds/tuba.wav"]

    const [properties,setProperties] = useState([{
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },{
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.45,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.75,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.75,
        stereo: 0.5
    },
    {
        volume: 1,
        pitch: 10,
        reverb: 0.75,
        stereo: 0.5
    }])
            
    function PlaySound(index: any) : void
    {
        const tonePlayer = new Tone.Player(tonePlayers[index]);
        tonePlayer.autostart=true;
        if(properties[index].volume===0)
        {
            tonePlayer.mute=true;
        }
        else
        {
            tonePlayer.mute=false;
            tonePlayer.volume.value=properties[index].volume;
        }
        
        if (properties[index].pitch!==0)
        {
         // const pitchShift = new Tone.PitchShift({ pitch: -5 }).toMaster();
            const pitch = new Tone.PitchShift(properties[index].pitch).toDestination();
            tonePlayer.connect(pitch);
        }

        if(properties[index].reverb!==0)
        {
            const Reverb = new Tone.Reverb(properties[index].reverb).toDestination();
            tonePlayer.connect(Reverb);
        }

        if(properties[index].stereo>=0)
        {
            const Stereo = new Tone.StereoWidener(properties[index].stereo).toDestination();
            tonePlayer.connect(Stereo);
        }

        tonePlayer.toDestination();
    }

    return(
        <body tabIndex={0}>
        <div className="windkit">
            {
                        windIcons.map((icon,index)=>{
                            return(
                                <div className="instrumentcontainer">
                <div className="windinstrument"  onClick={()=>{
                    PlaySound(index);
                }}>
                    <img className="icon" src={"/WindIcons/"+icon} alt=""/>
                </div>
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
                    <label>Pitch</label>
                    <input type="range" min="0" max="10" value={properties[index].pitch} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.pitch=Number.parseInt(value.target.value)
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
                    <input type="range" min="0" step={1} max="2" value={properties[index].stereo} onChange={(value)=>{
                        setProperties(properties.map((property,propertyIndex)=>{
                            if(propertyIndex===index)
                            {
                            property.stereo=Number.parseInt(value.target.value);
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

export const WindInstruments = new Instrument("Wind Family",WindInstrument);
