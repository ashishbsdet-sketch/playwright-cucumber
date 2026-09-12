# Playwright Cucumber Automation

[![Playwright Cucumber Tests](https://github.com/ashishbsdet-sketch/playwright-cucumber/actions/workflows/ci.yml/badge.svg)](https://github.com/ashishbsdet-sketch/playwright-cucumber/actions/workflows/ci.yml)

This is a small cross-browser test framework for the authentication flow on [The Internet](https://the-internet.herokuapp.com). I built it with Playwright, TypeScript and Cucumber so the scenarios remain readable while the browser setup and assertions stay in reusable code.

## What is covered

- successful login
- invalid username and password messages
- logout from the secure area
- Chromium, Firefox and WebKit execution
- isolated browser context for every scenario
- screenshots, traces and videos when a scenario fails
- HTML and JSON Cucumber reports
- strict TypeScript validation in CI

## Project layout

```text
.
├── features/                 # Business-readable Gherkin scenarios
├── src/
│   ├── config/               # Runtime configuration
│   ├── pages/                # Page objects and assertions
│   ├── steps/                # Cucumber step definitions
│   └── support/              # World object and browser hooks
├── .github/workflows/ci.yml  # Cross-browser CI pipeline
├── cucumber.js               # Cucumber runner settings
└── tsconfig.json             # TypeScript compiler settings
```

## Running it locally

You need Node.js 20 or later.

```bash
git clone https://github.com/ashishbsdet-sketch/playwright-cucumber.git
cd playwright-cucumber
npm ci
npx playwright install --with-deps
npm test
```

Other useful commands:

```bash
npm run test:smoke
npm run test:headed
npm run test:firefox
npm run test:webkit
npm run test:typecheck
```

## Configuration

The defaults work with the public demo site. Copy `.env.example` if you want a reference, then export the values in your terminal or CI environment.

| Variable | Purpose | Default |
| --- | --- | --- |
| `BASE_URL` | Application under test | `https://the-internet.herokuapp.com` |
| `TEST_USERNAME` | Valid test username | `tomsmith` |
| `TEST_PASSWORD` | Valid test password | Public demo password |
| `BROWSER` | `chromium`, `firefox` or `webkit` | `chromium` |
| `HEADLESS` | Run without a visible browser window | `true` |
| `DEFAULT_TIMEOUT` | Playwright action timeout in milliseconds | `15000` |

For a real application, credentials should be stored as protected CI secrets rather than committed to feature files.

## Reports and failure evidence

Every run produces an HTML report at `reports/cucumber-report.html` and a JSON result file. Failed scenarios also retain a screenshot, Playwright trace and video under `test-results/`. CI uploads these files as short-lived workflow artifacts.

## Design notes

- Feature files describe customer behaviour rather than selectors or browser actions.
- The page object owns navigation, locators and UI assertions.
- Hooks create a clean browser context for each scenario.
- Configuration is kept outside the feature file so the same suite can run in different environments.
- Playwright auto-waiting and assertions are used instead of fixed delays.

## Next improvements

The framework is deliberately focused on one workflow. The next useful additions would be accessibility checks, API-assisted setup and a second feature area rather than more variations of the same login test.

## Disclaimer

The Internet is a public test site. This repository is an independent portfolio project.
