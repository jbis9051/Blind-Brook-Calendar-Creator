import app from '../app'
import * as debug from 'debug';
import * as http from 'http';

const port = process.env.PORT || '3001';

app.set('port', port);

const server = http.createServer({}, app);

server.listen(port);
