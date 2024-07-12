import Link from 'next/link'
import React from 'react'

const LinkButton = () => {
  return (
    <Link
    href="/buy-now"
    className="  font-semibold text-sm md:text-md w-fit  rounded-md bg-accent-10  capitalize px-4 md:px-6 py-2 md:py-3 text-center text-white shadow-2xl transition-all ease-linear duration-75 hover:bg-opacity-90"
  >
    shop now
  </Link>
  )
}

export default LinkButton