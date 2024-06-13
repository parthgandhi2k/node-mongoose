import { createServer } from 'http';

import { APP_CONFIG } from './config';
import { connectDB } from './utils/db.util';
import app from './app/app';

const server = createServer(app);

const port = APP_CONFIG.PORT;

connectDB().then(() => {
    server.listen(port, () => console.log(`Server running on port ${port}`));
});
