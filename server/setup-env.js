import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Development environment
const devEnv = `# Development Environment Variables
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/padlupp-dev
`;

// Production environment
const prodEnv = `# Production Environment Variables
NODE_ENV=production
PORT=4173
CLIENT_URL=http://localhost:4173
MONGODB_URI=mongodb://localhost:27017/padlupp-prod
`;

// Write environment files
writeFileSync(join(__dirname, '.env.development'), devEnv);
writeFileSync(join(__dirname, '.env.production'), prodEnv);

console.log('Environment files created successfully!');
console.log('- .env.development (PORT: 3000)');
console.log('- .env.production (PORT: 4173)'); 