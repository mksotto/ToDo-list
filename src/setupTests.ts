import '@testing-library/jest-dom';
import { vi } from "vitest";

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

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