import { useState } from 'react'

export const ToolTipContent = ({ info, position }) => {
  const [iconToggle, setIconToggle] = useState(false)
  const { icon, title, description } = info

  const handleIconToggle = () => {
    iconToggle ? setIconToggle(false) : setIconToggle(true)
  }

  return (
    <button
      className="relative text-left focus-quad-ring rounded-lg"
      onClick={handleIconToggle}
    >
      <span className="cursor-pointer">{icon}</span>
      {iconToggle && (
        <div
          className={`absolute z-50 -right-8 md:right-auto bg-white py-3 px-5 w-64 rounded-md border-2 boxShadow-base ${
            position === 'bottom' ? 'bottom-9 md:bottom-11' : 'top-9 md:top-11'
          }`}
        >
          <h3 className="text-primary text-sm mb-1 font-bold">{title}</h3>
          <p className="text-primary text-sm z-10">{description}</p>
        </div>
      )}
    </button>
  )
}
