import 'dotenv/config';

export const config = {
  baseURL: process.env.BASE_URL ?? 'https://the-internet.herokuapp.com',
  browser: {
    name: (process.env.BROWSER ?? 'chromium').toLowerCase(),
    headless: process.env.HEADLESS !== 'false',
  },
  timeouts: {
    default: Number(process.env.DEFAULT_TIMEOUT ?? 15000),
  },
};
