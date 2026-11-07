import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const segments = pathname.split('/').filter(Boolean);
    if (segments.some(segment => segment.startsWith('.')) || pathname.includes('\\')) {
      response.writeHead(404).end('Introuvable');
      return;
    }
    let filename = resolve(root, '.' + pathname);
    if (filename !== resolve(root) && !filename.startsWith(resolve(root) + sep)) {
      response.writeHead(403).end('Accès refusé');
      return;
    }
    if ((await stat(filename)).isDirectory()) filename = resolve(filename, 'index.html');
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Introuvable');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Le port ${port} est déjà utilisé. Choisissez-en un autre avec la variable PORT.` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Portfolio local : http://localhost:${port}`));
