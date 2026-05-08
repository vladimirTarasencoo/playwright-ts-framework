import { config as loadDotenv } from 'dotenv';
import path from 'node:path';

loadDotenv({ path: path.resolve(process.cwd(), '.env'), quiet: true });

type EnvName = 'dev' | 'staging' | 'prod';

interface EnvConfig {
  baseUrl: string;
  apiBaseUrl: string;
  user: { email: string; password: string };
  admin: { email: string; password: string };
}

function pickEnv(): EnvName {
  const raw = (process.env.TEST_ENV ?? 'dev').toLowerCase();
  if (raw === 'dev' || raw === 'staging' || raw === 'prod') return raw;
  throw new Error(`Unknown TEST_ENV='${raw}'. Allowed: dev | staging | prod`);
}

function required(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

pickEnv();

export const env: EnvConfig = {
  baseUrl: required('BASE_URL', 'https://practicesoftwaretesting.com'),
  apiBaseUrl: required('API_BASE_URL', 'https://api.practicesoftwaretesting.com'),
  user: {
    email: required('TEST_USER_EMAIL', 'customer@practicesoftwaretesting.com'),
    password: required('TEST_USER_PASSWORD', 'welcome01'),
  },
  admin: {
    email: required('TEST_ADMIN_EMAIL', 'admin@practicesoftwaretesting.com'),
    password: required('TEST_ADMIN_PASSWORD', 'welcome01'),
  },
};
