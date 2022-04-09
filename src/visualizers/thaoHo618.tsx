/*
    Author: Thao Ho
    GitHub Handle: thaoHo618

    thaoHo618.tsx: Adding a circle waveform visualizer
*/

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const CircleVisualizer = new Visualizer(
    'Circle Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {
    
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);
        
        p5.angleMode('degrees');
        
        p5.background(0, 0, 0, 255); // sets background color
        p5.stroke(255, 0, 127);  // sets border color
        p5.strokeWeight(dim * 0.02); // sets border thickness 
        p5.noFill(); // disables filling geometry
        p5.translate (width/2.5, height/2 ); // sets location of the object
        const values = analyzer.getValue(); 

        p5.beginShape();
        for ( var i = 0 ; i <= 180; i++) { // creating the first half of the circle, thus <= 180
            var index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

            // using the index to map the radius of the circle to the waveform.
            var r = p5.map(values[index] as number, -1, 1, 150, 300); // 150 and 350 are min and max radius of circle respectively                
            
            var x =  r * p5.sin(i);
            var y =  r * p5.cos(i) ;
            p5.vertex(x, y);
        }
        p5.endShape();

        
        p5.beginShape();
        // eslint-disable-next-line
        for ( var i = 0 ; i <= 180; i++) { // creating the mirror of the first half
            // eslint-disable-next-line
            var index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

            // using the index to map the radius of the circle to the waveform.
            // eslint-disable-next-line
            var r = p5.map(values[index] as number, -1, 1, 150, 300);            
            
            // eslint-disable-next-line
            var x =  r * (-p5.sin(i)); // Added a negative sign to create a mirrored image of the circle
            // eslint-disable-next-line
            var y =  r * p5.cos(i) ;
            p5.vertex(x, y);
        }
        p5.endShape();
    },
  );