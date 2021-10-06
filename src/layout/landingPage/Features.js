import React from 'react'

export const Features = () => {
  const data = [
    {
      icon: '✍🏼',
      title: 'Create',
      description:
        'Easily create add members and games to begin tracking who wins and what games are your favorites',
    },
    {
      icon: '📖',
      title: 'Track',
      description:
        'Record every game your group plays to securely track who wins and loses',
    },
    {
      icon: '📊',
      title: 'Analyze',
      description:
        'Uncover stats behind your gameplays to understand who really is the best player',
    },
  ]

  const Feature = () => {
    return (
      <ul className="mt-8 lg:mt-18 flex flex-col gap-8 md:flex-wrap md:flex-row md:gap-12 justify-center">
        {data.map((item, index) => (
          <li
            key={index}
            className="bg-darkGreen rounded-md p-6 shadow-xs border-2 border-white w-full lg:max-w-400 "
          >
            <span className="text-white block text-2xl font-body mb-3">
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </span>
            <span className="text-white block text-xl font-body font-light">
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section>
      <h2 className="text-white text-center text-2xl font-bold md:text-4xl mt-20 lg:mt-28">
        Features
      </h2>
      <Feature />
    </section>
  )
}
