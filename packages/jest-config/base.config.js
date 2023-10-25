module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-config/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-config/fileMock.js',
  },
  testTimeout: 40000,
}
