import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';
import {brotliCompress,gzip,constants} from 'node:zlib';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const port=Number(process.env.PORT || 8000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.yml':'text/plain; charset=utf-8'};
const compressBrotli=promisify(brotliCompress),compressGzip=promisify(gzip);
const compressed=new Map();
function encoding(header=''){
  const preferences=new Map(header.toLowerCase().split(',').map(part=>{
    const [name,...parameters]=part.trim().split(';');
    const value=parameters.find(parameter=>parameter.trim().startsWith('q='));
    const quality=value ? Number(value.trim().slice(2)) : 1;
    return [name,Number.isFinite(quality)&&quality>=0&&quality<=1?quality:0];
  }));
  const quality=name=>preferences.get(name)??preferences.get('*')??0;
  return quality('br')>0&&quality('br')>=quality('gzip')?'br':quality('gzip')>0?'gzip':null;
}
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost'),decoded=decodeURIComponent(url.pathname);
    if(/(^|\/)\.git(\/|$)/.test(decoded))throw new Error('Forbidden');
    let target=path.resolve(root,'.'+decoded);
    if(target!==root&&!target.startsWith(root+path.sep))throw new Error('Forbidden');
    if((await stat(target)).isDirectory())target=path.join(target,'index.html');
    let body=await readFile(target);
    const extension=path.extname(target),chosen=encoding(req.headers['accept-encoding']);
    const headers={'Content-Type':types[extension]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Vary':'Accept-Encoding'};
    if(chosen&&body.length>=1024&&/\.(html|css|js|json|svg|md|txt|xml|yml)$/.test(extension)){
      const file=await stat(target),key=target+'|'+chosen;
      let cached=compressed.get(key);
      if(!cached||cached.mtime!==file.mtimeMs||cached.size!==file.size){
        const bytes=chosen==='br'?await compressBrotli(body,{params:{[constants.BROTLI_PARAM_QUALITY]:4}}):await compressGzip(body,{level:6});
        cached={mtime:file.mtimeMs,size:file.size,bytes};compressed.set(key,cached);
      }
      body=cached.bytes;headers['Content-Encoding']=chosen;
    }
    headers['Content-Length']=body.length;
    res.writeHead(200,headers);
    if(req.method==='HEAD')res.end();else res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`symex-vpn-website: http://127.0.0.1:${port}`));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
