import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const registry = 'https://reactbits.dev/r/FaultyTerminal-JS-CSS.json';
console.log('Fetching official React Bits Faulty Terminal...');
const res = await fetch(registry);
if (!res.ok) throw new Error(`React Bits registry returned ${res.status}: ${registry}`);
const data = await res.json();
if (!Array.isArray(data.files)) throw new Error('Registry did not include component source files.');
const dir = path.resolve('src/reactbits');
await mkdir(dir, { recursive: true });
const installed = new Set();
for (const file of data.files) {
  const basename = path.basename(file.path || '');
  if (!['FaultyTerminal.jsx','FaultyTerminal.js','FaultyTerminal.css'].includes(basename)) continue;
  if (typeof file.content !== 'string') throw new Error(`Missing source for ${basename}`);
  const target = basename === 'FaultyTerminal.js' ? 'FaultyTerminal.jsx' : basename;
  let content = file.content;
  if (target === 'FaultyTerminal.jsx' && !/import\s+React\s*[,}]|import\s+\*\s+as\s+React/.test(content)) {
    content = "import React from 'react';\n" + content;
  }
  await writeFile(path.join(dir,target), content, 'utf8');
  installed.add(target);
  console.log(`Installed ${target}`);
}
if (!installed.has('FaultyTerminal.jsx') || !installed.has('FaultyTerminal.css')) throw new Error('Faulty Terminal JSX/CSS not found in registry.');
const dependencies = Array.isArray(data.dependencies) ? data.dependencies : Object.entries(data.dependencies || {}).map(([name,version]) => `${name}@${version}`);
if (dependencies.length) {
  console.log('Installing React Bits dependencies:',dependencies.join(', '));
  execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install',...dependencies], { stdio:'inherit' });
}
console.log('Faulty Terminal installed.');
