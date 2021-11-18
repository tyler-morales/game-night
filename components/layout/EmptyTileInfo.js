import React from 'react'

export const EmptyTileInfo = ({ icon, name }) => {
  return (
    <div className="justify-center h-full flex flex-col gap-4 bg-primary rounded-lg p-8 ">
      <h4 className="text-2xl border-b-2 border-quad pb-4">
        {icon} Your {name} is empty
      </h4>
      <p className="text-base">
        💡 Click the Record a Game button to record your first game!
      </p>
    </div>
  )
}
