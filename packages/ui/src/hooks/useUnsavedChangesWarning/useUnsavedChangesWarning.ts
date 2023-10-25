import { useEffect } from 'react'
import { useRouter } from 'next/router'

const defaultRouteComparator = (newRoute: string, currentRoute: string): boolean =>
  newRoute !== currentRoute

export const useUnsavedChangesWarning = (
  unsavedChanges: boolean,
  customMessage?: string | undefined | null,
  routeComparator = defaultRouteComparator
) => {
  const router = useRouter()
  const message =
    customMessage ||
    'You have unsaved changes that will not be kept. Are you sure you want to leave without saving?'

  useEffect(() => {
    const routeChangeStart = (newRoute: string) => {
      if (routeComparator(newRoute, router.asPath) && unsavedChanges && !confirm(message)) {
        router.events.emit('routeChangeError')
        router.replace(router, router.asPath)
        throw 'Abort route change. Please ignore this error.'
      }
    }

    const beforeunload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault()
        e.returnValue = message
      }
    }

    window.onbeforeunload = beforeunload
    router.events.on('routeChangeStart', routeChangeStart)

    return () => {
      window.onbeforeunload = null
      router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [router, message, unsavedChanges, routeComparator])
}
