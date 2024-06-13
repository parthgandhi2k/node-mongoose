import { createServer } from 'http';

import { APP_CONFIG } from './config';
import { connectDB } from './utils/db.util';

const server = createServer();

const port = APP_CONFIG.PORT;

connectDB().then(() => {
    server.listen(port, () => console.log(`Server running on port ${port}`));
});
