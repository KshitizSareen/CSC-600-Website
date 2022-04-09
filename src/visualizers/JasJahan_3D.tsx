/*
    Author: Jasmine Jahan
    GitHub Handle: jasjahan
    JasJahan_3D.tsx: Adding a 3D Shape Visualizer
*/

import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const BoxVisualizer = new Visualizer(
        '3D Shape',
        (p5: P5, analyzer: Tone.Analyser) => {
          const width = window.innerWidth;
          const height = window.innerHeight / 2;

          p5.background("black"); 
          let values = analyzer.getValue();
          let locX = p5.mouseX - height / 2;
          let locY = p5.mouseY - width / 2;
          p5.ambientLight(50);
          p5.directionalLight(255, 0, 0, 0.25, 0.25, 0);
          p5.pointLight(0, 0, 255, locX, locY, 250);

          p5.beginShape();     
          p5.rotateZ(p5.frameCount * 0.02);
          p5.rotateX(p5.frameCount * 0.02);
          p5.specularMaterial(250);
          p5.translate(-width /10,0,0);
          for (let i = 0; i < values.length; i++) {  
            let amplitude = values[i] as number;
            let x = p5.map(i, 0, values.length -1, 0, amplitude * height) + width;
            let y = (  height / 2 + amplitude * width) + height;     
            // p5.translate(width/15, 0, 0); 
            p5.push();
            p5.box(x *.07, y *.15 , 100);
            p5.pop(); 
          }
     
         p5.endShape();
        } 
        
      );
