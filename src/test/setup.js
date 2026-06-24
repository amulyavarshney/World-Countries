import '@testing-library/jest-dom';

// Mock fetch for tests
global.fetch = vi.fn();

// Reset fetch mock between tests
beforeEach(() => {
  vi.clearAllMocks();
});
