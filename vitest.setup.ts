// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import ResizeObserver from 'resize-observer-polyfill';

// Provide ResizeObserver in jsdom for Vitest
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = ResizeObserver;
}
Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  value: () => false,
});

Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
  value: () => {},
});

// setupTests.ts
window.HTMLElement.prototype.scrollIntoView = function () {};
