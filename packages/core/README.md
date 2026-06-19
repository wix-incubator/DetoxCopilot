# @wix-pilot/core 🎯

> Core engine for Wix Pilot - Translating natural language into test actions

## Overview

The `@wix-pilot/core` package is the heart of Wix Pilot, responsible for:
- Orchestrating test execution
- Managing LLM interactions
- Providing the main API interface
- Handling driver registration and lifecycle
- Configurable logging system

## Installation

```bash
# npm
npm install --save-dev @wix-pilot/core

# yarn
yarn add -D @wix-pilot/core
```

## Pilot Usage

```typescript
import { pilot } from '@wix-pilot/core';
import { PuppeteerDriver } from '@wix-pilot/puppeteer';
import { CustomPromptHandler } from './custom-prompt-handler';

// Initialize Pilot with your preferred driver and a custom prompt handler
pilot.init({
  driver: new PuppeteerDriver(),
  promptHandler: new CustomPromptHandler(),
});

// Start a new Pilot flow
pilot.start();

// Run your automated flow
await pilot.perform(
  'Navigate to the homepage',
  'Click the login button',
  'The login form should be visible'
);

// End the flow
pilot.end();
```

## Autopilot Usage

Autopilot uses an agentic approach to perform goal-based automation flows.

```typescript
await pilot.autopilot('Register with a new account');
```

## Configuring Retries

Pilot retries individual operations when the LLM produces unusable code or
when screen analysis fails. The default of 2 attempts is fine for most
flows, but complex, dynamic screens may benefit from a higher value.

```typescript
const pilot = new Pilot({
  frameworkDriver: new DetoxFrameworkDriver(),
  promptHandler: new CustomPromptHandler(),
  options: {
    retryOptions: {
      // Max attempts per step in pilot.perform(...). Default: 2.
      stepMaxAttempts: 4,
      // Max attempts per screen analysis in pilot.autopilot(...). Default: 2.
      autopilotMaxAttempts: 4,
    },
  },
});
```

Both values must be positive integers (`>= 1`); invalid values throw at
construction time.

## Related Packages

- [@wix-pilot/puppeteer](../drivers/puppeteer) - Puppeteer driver for web testing
- [@wix-pilot/playwright](../drivers/playwright) - Playwright driver for modern web testing
- [@wix-pilot/detox](../drivers/detox) - Detox driver for React Native testing
- [@wix-pilot/appium](../drivers/appium) - Appium driver for mobile testing
