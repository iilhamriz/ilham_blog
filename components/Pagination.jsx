import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []

    for(let i = 1;  i <=  Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
  return (
   <nav>
    <ul className='flex text-lg'>
    <p className='text-white font-semibold mr-2'>Page</p>
        {pageNumbers.map(number => (
            <li key={number} className='px-2'>
                <a onClick={() => paginate(number)} className='cursor-pointer text-white font-semibold'>
                    {number}
                </a>
            </li>
        ))}
    </ul>
  </nav>
  )
};

export default Pagination;
