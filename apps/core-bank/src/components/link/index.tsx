import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as UiLink, LinkProps as UiLinkProps } from 'ui'

export interface LinkProps
  extends Omit<UiLinkProps, 'onClick' | 'onMouseEnter' | 'onTouchStart'>,
    NextLinkProps {}

export const Link = (props: LinkProps) => {
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref = true,
    prefetch,
    locale,
    legacyBehavior = true,
    onMouseEnter,
    onTouchStart,
    onClick,
    ...uiLinkProps
  } = props

  const nextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    legacyBehavior,
    onMouseEnter,
    onTouchStart,
    onClick,
  }

  return (
    <NextLink {...nextLinkProps}>
      <UiLink {...uiLinkProps} />
    </NextLink>
  )
}
