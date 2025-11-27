import { openApiFileContentsJson, openApiFilePath } from '@app/config';
import {
  // bookingRouter,
  // chairRouter,
  // locationRouter,
  loginRouter,
  // registrationRouter,
  // salonOpenHourRouter,
  // salonRouter,
  // serviceRouter,
  // setupRouter,
  // staffRouter,
} from '@app/routers';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressHealthcheck from 'express-healthcheck';
import * as openApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';

export const app = express();

app.use(cors());

app
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiFileContentsJson))
  .use('/healthcheck', expressHealthcheck());

app.use(
  openApiValidator.middleware({
    apiSpec: openApiFilePath,
    validateApiSpec: true,
    validateRequests: false,
    validateResponses: false,
  }),
);

// V2 API Routes
app
  // .use('/v2/booking', bookingRouter)
  // .use('/v2/chair', chairRouter)
  // .use('/v2/location', locationRouter)
  .use('/v2/login', loginRouter);
// .use('/v2/registration', registrationRouter)
// .use('/v2/salon', salonRouter)
// .use('/v2/salon-open-hour', salonOpenHourRouter)
// .use('/v2/service', serviceRouter)
// .use('/v2/setup', setupRouter)
// .use('/v2/staff', staffRouter);

/* eslint-disable  @typescript-eslint/no-unused-vars */
app.use((err, _req, res, _next) => {
  const { message } = err as Error;
  const payload = {
    message,
  };

  res.status(500);
  res.json(payload);
});
