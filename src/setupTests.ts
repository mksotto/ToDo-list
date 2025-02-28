import { configure } from '@testing-library/dom';
configure({
    computedStyleSupportsPseudoElements: true
})
import '@testing-library/jest-dom';
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    enumerable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});