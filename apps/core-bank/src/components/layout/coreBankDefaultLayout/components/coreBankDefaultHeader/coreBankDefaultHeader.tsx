import {
  Avatar,
  Button,
  CheckPointDownOutlinedIcon,
  GlobalOutlinedIcon,
  LogoutOutlinedIcon,
  Select,
} from 'ui'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { signOut, useSession } from 'auth'

import { Link } from '@/components'
import { RoutesConsts } from '@/consts'

import { BusinessDay } from '../businessDay'
import styles from './styles.module.scss'

// TODO: Replace logo placeholder
const Logo = () => (
  <Link href={RoutesConsts.Home} className={styles.coreBankDefaultHeader__logo}>
    CBS
  </Link>
)

interface CoreBankDefaultHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
//TODO: refactor after corresponding features will be implemented on BE
export const CoreBankDefaultHeader: React.FC<CoreBankDefaultHeaderProps> = props => {
  const { data: session } = useSession()

  // TODO: Replace username from token with username from getUserInfo response
  const username = session?.user?.name || ''

  return (
    <header className={styles.coreBankDefaultHeader} {...props}>
      <div className={styles.coreBankDefaultHeader__leftSection}>
        <Logo />
        <div className={styles.coreBankDefaultHeader__businessDaySection}>
          <BusinessDay />
        </div>
        <div className={styles.coreBankDefaultHeader__selectSection}>
          <CheckPointDownOutlinedIcon />
          <Select placeholder="Select Unit" size="small" />
        </div>
      </div>
      <div className={styles.coreBankDefaultHeader__rightSection}>
        {!!username.length && (
          <div className={styles.coreBankDefaultHeader__userInfoSection}>
            <Avatar size="small">{username[0].toLocaleUpperCase()}</Avatar>
            <div>{username}</div>
          </div>
        )}
        <Button type="text" icon={<GlobalOutlinedIcon />} />
        <Button type="text" onClick={() => signOut()} icon={<LogoutOutlinedIcon />} />
      </div>
    </header>
  )
}
