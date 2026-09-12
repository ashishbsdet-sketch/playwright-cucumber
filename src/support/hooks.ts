import { After, Before, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from '../config/config';
import type { CustomWorld } from './CustomWorld';

const resultsDir = resolve(process.cwd(), 'test-results');
const videoDir = resolve(resultsDir, 'videos');

const getBrowserLauncher = () => {
  switch (config.browser.name) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    case 'chromium':
    default:
      return chromium;
  }
};

Before(async function (this: CustomWorld, scenario) {
  await mkdir(resultsDir, { recursive: true });
  await mkdir(videoDir, { recursive: true });
  this.scenarioName = scenario.pickle.name;

  const browserFactory = getBrowserLauncher();
  this.browser = await browserFactory.launch({ headless: config.browser.headless });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 },
    },
  });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  const status = scenario.result?.status;
  const scenarioName = this.scenarioName.replace(/\s+/g, '-').toLowerCase();

  if (this.page && status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');

    const screenshotPath = resolve(resultsDir, `${Date.now()}-${scenarioName}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    const video = this.page.video();
    if (video) {
      try {
        const videoPath = await video.path();
        const videoBuffer = await readFile(videoPath);
        await this.attach(videoBuffer, 'video/webm');
      } catch (error) {
        // Ignore video attachment issues so the scenario result remains focused on the failure itself.
      }
    }
  }

  if (status === Status.FAILED) {
    const tracePath = resolve(resultsDir, `${Date.now()}-${scenarioName}-trace.zip`);
    await this.context?.tracing.stop({ path: tracePath });
  } else {
    await this.context?.tracing.stop();
  }

  await this.context?.close();
  await this.browser?.close();
});

