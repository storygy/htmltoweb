import DashboardAuthWrapper from './DashboardAuthWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardAuthWrapper>{children}</DashboardAuthWrapper>
}
