import { SidebarProvider } from '~/components/sidebar/sidebar.context'
import { DashboardSideBar } from '.'

export default function DashboardLeft() {
  return (
    <SidebarProvider>
      <DashboardSideBar></DashboardSideBar>
    </SidebarProvider>
  )
}
