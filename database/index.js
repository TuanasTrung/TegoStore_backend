import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { print, OutputType } from '../helpers/print.js';

dotenv.config({ path: './.env' })
mongoose.set('strictQuery', true)

async function connect() {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    print('✅ Connect successully!', OutputType.SUCCESS);
  }
  catch (error) {
    print('❌ Connect failed !', OutputType.ERROR);
    console.error(error);
  }
}

export default { connect }