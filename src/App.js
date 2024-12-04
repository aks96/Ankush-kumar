import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table/Table';
import Pagination from './Pagination/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(5);

  // Fetch data from the API
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
      .then(response => {
        const mappedData = response.data.map((item) => ({
          sNo: item["s.no"],
          amtPledged: item["amt.pledged"],
          percentageFunded: item["percentage.funded"],
        }));
        setData(mappedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const indexOfLastRecord = (currentPage + 1) * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);

  return (
    <div className="App">
      <Table data={currentRecords} />
      <Pagination 
        recordsPerPage={recordsPerPage} 
        totalRecords={data.length} 
        paginate={paginate}
      />
    </div>
  );
}

export default App;

