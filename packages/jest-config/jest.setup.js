/* eslint-disable @typescript-eslint/no-var-requires */
require('@testing-library/jest-dom/extend-expect')

global.console = {
  ...console,
  warn: jest.fn(),
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

jest.mock('next-auth', () => ({
  __esModule: true,
}))

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: {}, status: 'authenticated' })),
}))
