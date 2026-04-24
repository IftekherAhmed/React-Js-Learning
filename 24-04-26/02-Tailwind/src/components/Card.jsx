import React from 'react'

export default function Card(props) {
    const { title, description, imageUrl } = props

  return (
    <div className="rounded-md shadow-md bg-black text-gray-100">
      <img
        src={imageUrl || "https://picsum.photos/301"}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
          <p className="text-gray-400">
            {description}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-800 text-gray-200"
        >
          Read more
        </button>
      </div>
    </div>
  )
}
