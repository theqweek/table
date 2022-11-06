import React, { useState } from 'react'
import styles from './table.module.css'

const Thead = ({sortingData, item}) => {
  const [method, setMethod] = useState('asc');
  return (
    item.sorting ? <th 
      onClick={() => {
        if (method === 'asc') {
          sortingData(item.accessor, method);
          setMethod('desc')
        }
        if (method === 'desc') {
          sortingData(item.accessor, method);
          setMethod('')
        }
        if (method === '') {
          sortingData(item.accessor, method);
          setMethod('asc')
        }
      }}
      className={`${styles.table_head__item} ` + styles.clickable } 
      key={item.header}>
        {item.header}
    </th> : 
    <th 
      className={`${styles.table_head__item}`} 
      key={item.header}>
        {item.header}
    </th>
  )
}

export default Thead