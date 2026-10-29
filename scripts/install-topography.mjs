import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const registry='https://reactbits.dev/r/Topography-JS-CSS.json';
console.log('Fetching official React Bits Topography (JavaScript + CSS)...');
const res=await fetch(registry);
if(!res.ok)throw new Error(`React Bits registry returned ${res.status}. Check ${registry}`);
const data=await res.json();
if(!Array.isArray(data.files)||!data.files.length)throw new Error('Registry response did not include source files.');
const dir=path.resolve('src/reactbits');await mkdir(dir,{recursive:true});
for(const file of data.files){
  const basename=path.basename(file.path||'');
  if(!['Topography.jsx','Topography.js','Topography.css'].includes(basename))continue;
  if(typeof file.content!=='string')throw new Error(`Missing source for ${basename}`);
  const target=basename==='Topography.js'?'Topography.jsx':basename;
  await writeFile(path.join(dir,target),file.content,'utf8');
  console.log(`Installed official React Bits ${target}`);
}
const deps=Object.keys(data.dependencies||{});
const dependencies=Array.isArray(data.dependencies)?data.dependencies:deps.map(name=>`${name}@${data.dependencies[name]}`);
if(dependencies.length){console.log('Installing React Bits dependencies:',dependencies.join(', '));execFileSync(process.platform==='win32'?'npm.cmd':'npm',['install',...dependencies],{stdio:'inherit'});}
console.log('React Bits Topography installed. Run npm.cmd run dev.');
