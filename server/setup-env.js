import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envContent = `PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/padlupp_dev
JWT_SECRET=dev-secret-key
CLIENT_URL=http://localhost:5173`;

const filePath = join(__dirname, '.env.development');

try {
  await writeFile(filePath, envContent);
  console.log('Successfully created .env.development file');
} catch (error) {
  console.error('Error creating .env.development file:', error);
} 