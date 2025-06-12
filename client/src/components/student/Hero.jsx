import React from 'react'
import {assets} from '../../assets/assets'
import SearchBar from './SearchBar'
const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full
    md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/75'>
        <h1 className='md:text-home-heading-large text-home-heading-small relative
        font-bold text-gray-900 max-w-3xl mx-auto'>Build your future with learning options that <span className='text-blue-600'>
             match your goals.</span> <img src={assets.sketch} alt="sketch"
             className='md:block hidden absolute -bottom-7 right-0' /></h1>
        <p className='md:block hidden text-grey-500 max-w-2xl mx-auto'>Get inspired by
             leading instructors, stay motivated with interactive content, 
            and connect with others who want to grow — just like you. </p>     

        <p className='md:hidden text-grey-500 max-w-sm mx-auto'>Learn from top instructors, enjoy engaging 
            content, and grow with a like-minded community.</p>    
        <SearchBar />
    </div>
  )
}

export default Hero
