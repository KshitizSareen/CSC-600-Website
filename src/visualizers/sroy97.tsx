/*
    Author: Saptarshi Roy
    GitHub Handle: sroy97

    sroy97.tsx: string waveform visualizer
*/

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const EllipticalVisualizer = new Visualizer(
    'Elliptical Nebular Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {
    
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        
        p5.background(0, 0, 0, 210); 
        p5.stroke(255,0,127);
        p5.strokeWeight(3) 
        p5.noFill(); 

        const values = analyzer.getValue(); 

        p5.beginShape();

        values.forEach((val, i) => {
          const amp = values[i] as number
          p5.ellipse(600, 200, 300 + width * amp, 150 + height * amp);
          p5.ellipse(600, 200, 150 + height * amp, 300 + width * amp);
        });

        p5.endShape();

    },
  );
