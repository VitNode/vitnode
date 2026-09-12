import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import {
  ADMIN_ENTRY_PATH,
  adminReturnToFor,
  canEnterAdmin,
  ensureAdminAccess,
  loadAdminMessages,
  preloadAdminAccess,
} from '@vitnode/core/tanstack/admin'

import { AdminShell } from '@/components/admin-shell'
import { pageHead } from '@/lib/page-head'

export const Route = createFileRoute('/_admin')({
  beforeLoad: async ({ context, location, preload }) => {
    const access = preload
      ? await preloadAdminAccess(context.queryClient)
      : await ensureAdminAccess(context.queryClient)

    if (!canEnterAdmin(access)) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        search: { returnTo: adminReturnToFor(location) },
        to: ADMIN_ENTRY_PATH,
      } as unknown as Parameters<typeof redirect>[0])
    }

    return { adminAccess: access }
  },

  loader: async ({ context }) => {
    const { adminNav } = await import('@/lib/admin-nav')

    await loadAdminMessages({ ...context, namespaces: adminNav.namespaces })
  },

  head: () => pageHead({ robots: 'noindex, nofollow' }),
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  )
}
