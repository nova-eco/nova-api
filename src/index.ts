import 'dotenv/config';
import { app } from '@app/app';
import { apiName, apiPort } from '@app/config';
import { Database } from '@app/models';

app.listen(apiPort, async () => {
  // eslint-disable-next-line no-console
  console.log(`api-${apiName}: listening: ${apiPort}`);

  // Initialize database connection pool
  await Database.init();

  // eslint-disable-next-line no-console
  console.log('Database connection initialized');
});
