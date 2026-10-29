import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const registry='https://reactbits.dev/r/Dither-JS-CSS.json';
console.log('Fetching official React Bits Dither...');
const res=await fetch(registry);
if(!res.ok)throw new Error(`React Bits registry returned ${res.status}: ${registry}`);
const data=await res.json();
if(!Array.isArray(data.files))throw new Error('Registry did not contain source files');
const dir=path.resolve('src/reactbits');await mkdir(dir,{recursive:true});
let installed=0;
for(const file of data.files){
 const basename=path.basename(file.path||'');
 if(!['Dither.jsx','Dither.js','Dither.css'].includes(basename))continue;
 if(typeof file.content!=='string')throw new Error(`Missing source for ${basename}`);
 const target=basename==='Dither.js'?'Dither.jsx':basename;
 let content=file.content;
 if(target==='Dither.jsx'&&!/import\s+React\s*[,}]|import\s+\*\s+as\s+React/.test(content)){
   content="import React from 'react';\n"+content;
 }
 await writeFile(path.join(dir,target),content,'utf8');
 installed++;console.log(`Installed ${target}`);
}
if(installed<2)throw new Error('Dither component and CSS not both installed');
console.log('React Bits Dither installed.');
