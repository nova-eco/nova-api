import 'dotenv/config';
import { app } from '@app/app';
import { apiName, apiPort } from '@app/config';
import { Database } from '@app/models';

app.listen(apiPort, async () => {
  console.log(`api-${apiName}: listening: ${apiPort}`);

  // Initialize database connection pool
  await Database.init();
  console.log('Database connection initialized');
});
