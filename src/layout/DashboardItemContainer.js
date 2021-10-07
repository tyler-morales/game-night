export const DashboardItemContainer = ({ children, title, info, options }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center mb-5">
        <h2 className="flex gap-2 items-center text-2xl text-left">
          {title} {info && info}
        </h2>
        {options && options}
      </div>
      <div className="min-h-364 bg-primary rounded-lg p-5 border-2 border-quad shadow-lg">
        {children}
      </div>
    </div>
  )
}
