// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const BarCircleVisualizer = new Visualizer(
  '3D Waveform',
  (p5: P5, analyzer: Tone.Analyser) => {

    const width = window.innerWidth;
    const height = window.innerHeight / 2;

      p5.background(250, 250, 250, 255);

      const values = analyzer.getValue();
      p5.beginShape();
      p5.rotateY(p5.frameCount * 0.01);
      p5.rotateX(p5.frameCount*0.01);
      let startx=0;
      let starty=0;
      let startz=0;
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width)-width/2;
        const y = (height / 2 + amplitude * height)-height/2;
        // Place vertex
        if(i%2===0)
        {
        p5.translate(x-startx,y-starty,(0.1*i)-startz);
        startz=i*0.1;
        }
        else
        {
            p5.translate(x-startx,y-starty,(-0.1*i)-startz);
            startz=i*-0.1;
        }
        p5.push();
      p5.sphere(8, 6, 4);
      p5.pop();
      startx=x;
      starty=y;
      }
      p5.endShape();
    }

   // p5.endShape();

);
