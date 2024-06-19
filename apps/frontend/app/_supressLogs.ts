/* eslint-disable no-console */
// TODO: Remove this file when Radix UI is stable for React 19 - https://github.com/radix-ui/primitives/pull/2811
const prevConsoleError = console.error;
const prevConsoleWarn = console.warn;

console.error = (...args) => {
  if (JSON.stringify(args[0]).includes("Warning: Accessing element.ref")) {
    return;
  }

  prevConsoleError(...args);
};

console.warn = (...args) => {
  if (JSON.stringify(args[0]).includes("Warning: Accessing element.ref")) {
    return;
  }

  prevConsoleWarn(...args);
};
