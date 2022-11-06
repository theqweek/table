import React from 'react'
import { CONDITIONS as conditions } from './conditions'
import s from './search-filters.module.css'

const SearchFilters = ({ columns, setFilters, filters, filterData, isChosen }) => {

  return (
    <div className={s.filters}>
      <select 
        defaultValue="Выберите колонку"
        onChange={(e) => {setFilters((filters) => ({...filters, column: e.target.value})); console.log(e.target.value);}} 
        className={s.filters_select}>
          <option 
            className={s.filters_option}
            disabled="disabled">
              Выберите колонку
          </option>
          {columns.map(opt =>  (
            opt.sorting && <option 
              className={s.filters_option}
              value={opt.accessor} 
              key={opt.header}>
                {opt.header}
              </option>
          ))}
      </select>
      <select
        className={s.filters_select}
        defaultValue="Выберите фильтр"
        onChange={(e) => {setFilters((filters) => ({...filters, condition: e.target.value })); console.log(e.target.value)}} 
        style={{width: '100%'}}>
          <option 
            className={s.filters_option}
            disabled="disabled">
              Выберите фильтр
          </option>
          {conditions.map(opt => (
            <option 
              className={s.filters_option}
              value={opt.accessor} 
              key={opt.header}>
                {opt.header}
              </option>
          ))}
      </select>
      <input
        className={s.filters_input}
        value={filters.value}
        type="text" 
        onChange={(e) => {setFilters((filters) => ({...filters, inputValue: e.target.value }))}}
      />
      <button 
        className={s.filters_btn}
        onClick={() => filterData(filters, conditions)}>
          Сортировать
      </button>
      {isChosen && <p className={s.filters_p} style={{color: 'red', fontSize: '12px'}}>Выберите колонку и фильтр</p>}
    </div>
  )
}

export default SearchFilters