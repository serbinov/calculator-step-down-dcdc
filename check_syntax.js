const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const re=/\<script([^>]*)\>([\s\S]*?)<\/script>/gi;
let m, i=0;
while((m=re.exec(html))!==null){
  const attrs=m[1];
  if(/type\s*=\s*['\"]application\/ld\+json['\"]/i) continue;
  i++;
  try { new Function(m[2]); } catch(e) { console.error('Script', i, 'error:', e.message); process.exit(1); }
}
console.log('OK');
