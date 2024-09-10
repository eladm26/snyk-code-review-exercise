import * as dotenv from 'dotenv';
dotenv.config();

import { createApp } from "./app";

const PORT = process.env.PORT || '3000';

const app = createApp();

app.listen(parseInt(PORT), () => {
    console.log(`server running on PORT ${PORT}...`);
  });
