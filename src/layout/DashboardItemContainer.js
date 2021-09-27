export const DashboardItemContainer = ({ children, title }) => {
  return (
    <div>
      <h2 className="mb-5 text-2xl text-left">{title}</h2>
      <div className="bg-primary rounded-lg p-5">{children}</div>
    </div>
  )
}
