import * as types from './auth'

declare module 'next-auth' {
  interface Session extends types.Session {}

  interface User extends types.User {}

  interface Account extends types.Account {}

  interface Profile extends types.Profile {}
}

declare module 'next-auth/jwt' {
  interface JWT extends types.JWT {}
}
