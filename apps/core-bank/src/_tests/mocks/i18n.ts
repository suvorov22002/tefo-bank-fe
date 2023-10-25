export const i18nMock = {
  useTranslation: () => {
    return {
      t: (str: string) => str,
      ready: true,
      i18n: {
        changeLanguage: () => new Promise(() => undefined),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => undefined,
  },
}
