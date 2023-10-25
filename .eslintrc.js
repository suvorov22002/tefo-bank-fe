module.exports = {
  root: true,
  extends: ['custom'],
  env: {
    jest: true,
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
