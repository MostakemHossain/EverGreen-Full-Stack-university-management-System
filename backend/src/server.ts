import { Server } from 'http';
import mongoose from 'mongoose';
import seedsSuperAdmin from './DB';
import app from './app';
import config from './app/config';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    await seedsSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//promise.Reject
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected,sutting down the server .....');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException is detected,sutting down the server .....');

  process.exit(1);
});
