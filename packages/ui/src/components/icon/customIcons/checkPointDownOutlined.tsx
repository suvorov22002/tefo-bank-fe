import { Icon } from '../icon'
import { CustomIconComponentProps, SVGIconProps } from '../types'

export const CheckPointDownOutlinedSvg: React.FC<SVGIconProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <mask x="0" y="0" width="16" height="16">
      <rect width="16" height="16" fill="currentColor" />
    </mask>
    <g mask="url(#mask0_2043_98859)">
      <path
        d="M7.29999 8.89998L10.6 5.59998L9.64999 4.64998L7.29999 6.99998L6.36666 6.06665L5.41666 7.01665L7.29999 8.89998ZM7.99999 12.9C9.35555 11.6555 10.3611 10.525 11.0167 9.50831C11.6722 8.49165 12 7.58887 12 6.79998C12 5.58887 11.6139 4.5972 10.8417 3.82498C10.0694 3.05276 9.12221 2.66665 7.99999 2.66665C6.87777 2.66665 5.93055 3.05276 5.15832 3.82498C4.3861 4.5972 3.99999 5.58887 3.99999 6.79998C3.99999 7.58887 4.32777 8.49165 4.98332 9.50831C5.63888 10.525 6.64443 11.6555 7.99999 12.9ZM7.99999 14.6666C6.2111 13.1444 4.87499 11.7305 3.99166 10.425C3.10832 9.11942 2.66666 7.91109 2.66666 6.79998C2.66666 5.13331 3.20277 3.80554 4.27499 2.81665C5.34721 1.82776 6.58888 1.33331 7.99999 1.33331C9.4111 1.33331 10.6528 1.82776 11.725 2.81665C12.7972 3.80554 13.3333 5.13331 13.3333 6.79998C13.3333 7.91109 12.8917 9.11942 12.0083 10.425C11.125 11.7305 9.78888 13.1444 7.99999 14.6666Z"
        fill="currentColor"
      />
    </g>
  </svg>
)

export const CheckPointDownOutlinedIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CheckPointDownOutlinedSvg} style={{ fontSize: 16 }} {...props} />
)
