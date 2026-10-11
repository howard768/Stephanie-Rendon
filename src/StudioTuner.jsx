import { useEffect } from 'react';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';
// Local controls only; Vite removes this component from production builds.
export default function StudioTuner(){
  const values=useDialKit('Portfolio finish',{radius:[4,0,18],motion:[350,150,650,10],accent:'#dce8b4'},{defaultCollapsed:false});
  useEffect(()=>{
    document.documentElement.style.setProperty('--radius',`${values.radius}px`);
    document.documentElement.style.setProperty('--motion',`${values.motion}ms`);
    document.documentElement.style.setProperty('--accent',values.accent);
  },[values.radius,values.motion,values.accent]);
  return <DialRoot position="bottom-right" defaultOpen={true}/>;
}
