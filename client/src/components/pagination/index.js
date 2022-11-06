import React from 'react'
import s from './pagination.module.css'

const Pagination = ({ LIMIT, dataLength, setCurrentPage, currentPage}) => {
  const pageNumbers = Array.from({ length: Math.ceil(dataLength/LIMIT) }, (_, idx) => idx + 1 );
  
  return (
    <>
      {dataLength ? <ul className={s.pagination}>
        <li 
          className={currentPage === 1 ? `${s.pagination_item} ` + s.disabled : s.pagination_item} 
          onClick={() => setCurrentPage(cur => cur - 1 ? cur - 1 : cur)}>&#8656;
        </li>
        {pageNumbers.map(item => (
          <li 
            key={item} 
            className={currentPage === item ? `${s.pagination_item} ` + s.active : s.pagination_item} 
            onClick={() => setCurrentPage(item)}>
              {item}
          </li>
        ))}
        <li 
          className={currentPage === pageNumbers.length ? `${s.pagination_item} ` + s.disabled : s.pagination_item} 
          onClick={() => setCurrentPage(cur => cur < pageNumbers.length ? cur + 1 : cur)}>
            &#8658;
        </li>
      </ul> : null}
    </>
  )
}

export default Pagination