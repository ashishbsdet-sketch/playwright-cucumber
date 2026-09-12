# Playwright + Cucumber Automation Framework

A professional end-to-end UI automation framework built with Playwright, TypeScript, and Cucumber BDD. The project is designed to keep tests readable for business stakeholders while still being maintainable for engineers.

It automates the public The Internet demo application and focuses on authentication scenarios such as:
- successful login
- invalid username
- invalid password
- logout flow

## Why this framework

This setup follows modern automation best practices:
- Behavior-driven scenarios in Gherkin
- Page Object Model for UI interactions
- Browser lifecycle management via Cucumber hooks
- Isolation of browser context per scenario
- Screenshot, video, and trace capture on failure
- Browser matrix support (Chromium, Firefox, WebKit)
- TypeScript for safer and more maintainable test code

## Project structure

```text
playwright-cucumber/
├── features/
│   └── login.feature
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   └── LoginPage.ts
│   ├── steps/
│   │   └── login.steps.ts
│   ├── support/
│   │   ├── CustomWorld.ts
│   │   └── hooks.ts
│   └── utils/
├── cucumber.js
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the required tools:
- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

If you are running on a local machine and want to install browser binaries only:

```bash
npx playwright install
```

## Run tests

Run the default browser suite:

```bash
npm test
```

Run only smoke-tagged scenarios:

```bash
npm run test:smoke
```

Run headed mode (visible browser):

```bash
npm run test:headed
```

Run Firefox:

```bash
npm run test:firefox
```

Run WebKit:

```bash
npm run test:webkit
```

## Browser configuration

Browser selection is controlled from `src/config/config.ts` and the environment variable `BROWSER`.

Supported values:
- `chromium` (default)
- `firefox`
- `webkit`

Example:

```bash
BROWSER=firefox HEADLESS=false npx cucumber-js
```

## Failure artifacts

When a scenario fails, the framework captures:
- screenshot
- video recording
- trace file

Artifacts are saved under:

```text
./test-results/
```

This makes debugging faster because the engineer can review the exact failing state of the application.

## BDD approach

The feature file describes behavior in a business-readable format:

```gherkin
Feature: Customer authentication
  Scenario Outline: Customer login attempts
    When the customer signs in with username "<username>" and password "<password>"
    Then <expected_result>
```

This keeps the tests understandable for QA and product stakeholders while still allowing technical implementation behind the scenes.

## Best practices used in this project

- Use semantic locators with Playwright role-based selectors where possible
- Keep page logic separate from scenario logic
- Reuse code under page objects and reusable hooks
- Avoid hardcoded waits; rely on Playwright assertions
- Keep tests isolated via browser context per scenario
- Fail fast with clear assertions

## Troubleshooting

If tests fail due to a selector mismatch:
- check the DOM structure in the target app
- prefer role-based selectors over CSS-only selectors
- use exact heading matching where there are multiple headings on the page

If browser binaries are missing:

```bash
npx playwright install
```

## Future improvements

- add API layer for setup/teardown data
- add data-driven fixtures for reusable test data
- add CI pipeline with GitHub Actions
- add enhanced reporting (Allure / HTML dashboards)
- add accessibility checks with Axe

## License

This project is intended for learning and demonstration purposes.
