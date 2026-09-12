const environmentValue = (name: string, fallback: string): string => {
  const value = process.env[name];
  return value && value.trim() ? value : fallback;
};

const supportedBrowsers = ['chromium', 'firefox', 'webkit'] as const;
type BrowserName = (typeof supportedBrowsers)[number];

const browserName = environmentValue('BROWSER', 'chromium').toLowerCase();
if (!supportedBrowsers.includes(browserName as BrowserName)) {
  throw new Error(
    `Unsupported BROWSER value "${browserName}". Use chromium, firefox, or webkit.`
  );
}

export const config = {
  baseURL: environmentValue('BASE_URL', 'https://the-internet.herokuapp.com'),
  credentials: {
    username: environmentValue('TEST_USERNAME', 'tomsmith'),
    password: environmentValue('TEST_PASSWORD', 'SuperSecretPassword!')
  },
  browser: {
    name: browserName as BrowserName,
    headless: environmentValue('HEADLESS', 'true').toLowerCase() !== 'false'
  },
  timeouts: {
    default: Number(environmentValue('DEFAULT_TIMEOUT', '15000'))
  }
};
