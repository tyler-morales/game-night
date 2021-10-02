export const DashboardItemContainer = ({ children, title, options }) => {
  return (
    <div>
      <div className="flex items-center mb-5">
        <h2 className="text-2xl text-left">{title}</h2>
        {options && options}
      </div>
      <div className="bg-primary rounded-lg p-5 border-2 border-quad shadow-lg">
        {children}
      </div>
    </div>
  )
}
