import { After, Before, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit, type BrowserType } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from '../config/config';
import type { CustomWorld } from './CustomWorld';

const resultsDir = resolve(process.cwd(), 'test-results');
const videoDir = resolve(resultsDir, 'videos');

const browserLaunchers: Record<string, BrowserType> = {
  chromium,
  firefox,
  webkit
};

Before(async function (this: CustomWorld, scenario) {
  await Promise.all([
    mkdir(resultsDir, { recursive: true }),
    mkdir(videoDir, { recursive: true })
  ]);

  this.scenarioName = scenario.pickle.name;
  this.browser = await browserLaunchers[config.browser.name].launch({
    headless: config.browser.headless
  });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 }
    }
  });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.timeouts.default);
});

After(async function (this: CustomWorld, scenario) {
  const failed = scenario.result?.status === Status.FAILED;
  const safeName = this.scenarioName.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const timestamp = Date.now();
  const video = this.page?.video();

  try {
    if (failed && this.page) {
      const screenshot = await this.page.screenshot({
        path: resolve(resultsDir, `${timestamp}-${safeName}.png`),
        fullPage: true
      });
      await this.attach(screenshot, 'image/png');
    }

    if (this.context) {
      const tracePath = failed
        ? resolve(resultsDir, `${timestamp}-${safeName}-trace.zip`)
        : undefined;
      await this.context.tracing.stop(tracePath ? { path: tracePath } : undefined);
      await this.context.close();
    }

    if (failed && video) {
      const videoBuffer = await readFile(await video.path());
      await this.attach(videoBuffer, 'video/webm');
    }
  } finally {
    await this.browser?.close();
  }
});
