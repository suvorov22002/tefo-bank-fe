import { App as AntdApp } from 'antd'

// App Component provide global style & static function replacement.
// Static methods of modal, notification and message are not recommended in antd v5.
// The Static methods of listed entities ignore ConfigProvider configuration and will not have proper support for React 18 concurrent mode.
// https://ant.design/components/app/
// https://ant.design/docs/blog/why-not-static
// Corresponding specs should be added along with particular entity
export const AppStatic = AntdApp
export const useAppStatic = AppStatic.useApp
