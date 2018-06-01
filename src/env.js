import path from 'path';

const envFilePath = path.join(__dirname, '../.env');

require('dotenv').config({ path: envFilePath });
