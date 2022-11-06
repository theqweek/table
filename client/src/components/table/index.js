import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './table.module.css'
import Pagination from '../pagination';
import SearchFilters from '../searchFilters';
import Thead from './thead';
import axios from 'axios'


const Table = ({ COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  // Получение данных с сервера

  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const response = await axios.get(`/data`);
    const serverData = await response.data;

    setData(serverData);
  }, [])

  useEffect(() => {
    getData()
      .catch(console.error)
  }, [getData])

  //Набор стейтов

  const [filters, setFilters] = useState({ column: '', condition: '', inputValue: '' });
  const [isChosen, setIsChosen] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT = 10;
  const lastDataIndex = currentPage * LIMIT;
  const firstDataIndex = lastDataIndex - LIMIT;
  const [currentData, setCurrentData] = useState(filteredData.slice(firstDataIndex, lastDataIndex))

  //Рендеринг при изменении зависимостей

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    setCurrentData(filteredData.slice(firstDataIndex, lastDataIndex))
  }, [filteredData, firstDataIndex, lastDataIndex, data])

  // Фильтрация

  const filterData = (filters, conditions) => {
    const { column, condition, inputValue } = filters;

    if (!column || !condition) {
      setIsChosen(true)
      return;
    }
    setIsChosen(false)

    if (!inputValue) {
      setFilteredData(data);
      return;
    }

    const sorter = conditions.find(item => item.accessor === condition)?.sorter;

    setFilteredData(data.filter(item => sorter(inputValue, item[column])))
    setCurrentData(filteredData.slice(firstDataIndex, lastDataIndex));
    setCurrentPage(1)
  }

  // Сортировка по столбцам

  const sortingData = (column, method) => {
    setCurrentPage(1);
    setFilteredData(filteredData.sort((a, b) => {
      switch (method) {
        case 'asc':
          if (typeof a[column] === 'string') {
            if (a[column] < b[column]) {
              return -1;
            }
            if (a[column] > b[column]) {
              return 1;
            }
            return 0;
          } else {
            return a[column] - b[column];
          }
        case 'desc':
          if (typeof a[column] === 'string') {
            if (a[column] < b[column]) {
              return 1;
            }
            if (a[column] > b[column]) {
              return -1;
            }
            return 0;
          } else {
            return b[column] - a[column];
          }
        default:
          return a.id - b.id
      }
    }))
    setCurrentData(filteredData.slice(firstDataIndex, lastDataIndex));
  }

  return (
    <>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr
              className={styles.table_head}
              key={'columns'}>
              {columns.map(item => (
                <Thead key={item.header} sortingData={sortingData} item={item} />
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? currentData.map(row => (
              <tr
                className={styles.table_row}
                key={row.id}>
                {columns.map(item => (
                  <td
                    className={styles.table_row__item}
                    key={row[item.accessor]}>
                    {row[item.accessor]}
                  </td>
                ))}
              </tr>
            )) : <tr className={styles.table_row} key={'NO DATA'}><td colSpan={columns.length}><h3 style={{ textAlign: 'center' }}>No Data</h3></td></tr>}
          </tbody>
        </table>
        <SearchFilters
          columns={columns}
          setFilters={setFilters}
          filters={filters}
          filterData={filterData}
          isChosen={isChosen}
          setIsChosen={setIsChosen}
        />
      </div>
      <Pagination
        LIMIT={LIMIT}
        dataLength={filteredData.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}

export default Table