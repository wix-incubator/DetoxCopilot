import { TestingFrameworkDriver } from "@/types/framework";
import { PromptHandler } from "@/types/prompt";

/**
 * Configuration for test context awareness.
 *
 * Allows you to customize how the system detects the current test file path (for logging, cache, etc).
 * If omitted, a default implementation is used that works with Jest and most test runners.
 */
export interface TestContextConfig {
  /**
   * Returns the absolute path to the current test file.
   * Override this if you use a custom test runner or need special logic.
   * If not provided, a default implementation is used.
   */
  getCurrentTestFilePath?: () => string | undefined;
}

/**
 * Pilot behavior configuration options.
 */
export interface PilotOptions {
  /** Cache options */
  cacheOptions?: CacheOptions;
  /** Retry options for steps and autopilot screen analysis */
  retryOptions?: RetryOptions;
}

export interface CacheOptions {
  /** If true, cache will be used for operations (default: true) */
  shouldUseCache?: boolean;
  /** If true, cache will be updated with new data (default: false) */
  shouldOverrideCache?: boolean;
}

/**
 * Retry configuration for Pilot's internal retry loops.
 *
 * Pilot retries individual operations when the LLM produces code that
 * fails to evaluate, or when screen analysis produces an unusable plan.
 * For complex screens it can be useful to allow more than the default
 * of 2 attempts.
 */
export interface RetryOptions {
  /**
   * Maximum number of attempts the step performer will make for each
   * step passed to `pilot.perform(...)`. Must be >= 1. Default: 2.
   */
  stepMaxAttempts?: number;
  /**
   * Maximum number of attempts the autopilot will make when analysing
   * a screen and producing the next plan step. Must be >= 1. Default: 2.
   */
  autopilotMaxAttempts?: number;
}

/**
 * Complete Pilot configuration.
 */
export interface Config {
  /** Testing framework driver */
  frameworkDriver: TestingFrameworkDriver;
  /** AI service handler */
  promptHandler: PromptHandler;
  /** Custom logger delegate implementation */
  loggerDelegate?: import("@/types/logger").LoggerDelegate;
  /** Optional behavior settings */
  options?: PilotOptions;
  /** Optional test runner integration. */
  testContext?: TestContextConfig;
}

/**
 * Executed test step record.
 */
export type PreviousStep = {
  /** Step description */
  step: string;
  /** Generated test code */
  code: string;
  /** Step execution result */
  result?: any;
  /** Step execution error */
  error?: any;
};

/**
 * Cache value for StepPerformer.
 * Contains the generated code for a step.
 */
export interface StepPerformerCacheValue {
  /** Generated code */
  code: string;
}
