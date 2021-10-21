import { useState } from 'react'

export const ToolTipContent = ({ info }) => {
  const [iconToggle, setIconToggle] = useState(false)
  const { icon, title, description } = info

  const handleIconToggle = () => {
    iconToggle ? setIconToggle(false) : setIconToggle(true)
  }

  return (
    <div className="relative" onClick={handleIconToggle}>
      <span className="cursor-pointer">{icon}</span>
      {iconToggle && (
        <div className="absolute bottom-9 md:bottom-11 -right-8 md:right-auto bg-white py-3 px-5 w-64 rounded-md border-2 boxShadow-base">
          <h3 className="text-primary text-sm mb-1 font-bold ">{title}</h3>
          <p className="text-primary text-sm z-10">{description}</p>
        </div>
      )}
    </div>
  )
}
