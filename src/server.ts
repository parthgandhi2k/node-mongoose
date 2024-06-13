import { createServer } from 'http';

import { APP_CONFIG } from './config';

const server = createServer();

const port = APP_CONFIG.PORT;

server.listen(port, () => console.log(`Server running on port ${port}`));
