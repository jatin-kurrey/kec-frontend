import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DataTable from 'react-data-table-component';
import { FunnelIcon, MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

// Sample data for companies
const companiesData = [
  {
    id: 1,
    date: "2024-03-15", // example date, adjust as needed
    name: "Codenicely",
    logo: "https://cdn.worldvectorlogo.com/logos/codenicely.svg", // placeholder
    sector: "Software Development",
    package: "6 LPA",
    students: 5
  },
  {
    id: 2,
    date: "2024-03-17",
    name: "Sthanve Software",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Software Development",
    package: "5 LPA",
    students: 4
  },
  {
    id: 3,
    date: "2024-03-20",
    name: "Augtech Nextwealth",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Tech Consulting",
    package: "7 LPA",
    students: 3
  },
  {
    id: 4,
    date: "2024-03-22",
    name: "Gravity Engineering Services",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Engineering",
    package: "6.5 LPA",
    students: 2
  },
  {
    id: 5,
    date: "2024-03-25",
    name: "IB Group",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "IT Services",
    package: "5.5 LPA",
    students: 1
  },
  {
    id: 6,
    date: "2024-03-28",
    name: "Avinash Builders",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "4.5 LPA",
    students: 1
  },
  {
    id: 7,
    date: "2024-04-01",
    name: "AQUAPLAST Infraproject Pvt. Ltd.",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Infrastructure",
    package: "4.7 LPA",
    students: 1
  },
  {
    id: 8,
    date: "2024-04-05",
    name: "IIT Bhilai",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/IIT_Bhilai_Logo.svg/1200px-IIT_Bhilai_Logo.svg.png",
    sector: "Research / Academia",
    package: "N/A (Project Assistant)",
    students: 2
  },
  {
    id: 9,
    date: "2024-04-10",
    name: "Deepija Telecommunication Pvt Ltd",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Telecommunications",
    package: "5 LPA",
    students: 1
  },
  {
    id: 10,
    date: "2024-04-15",
    name: "Adani",
    logo: "https://cdn.worldvectorlogo.com/logos/adani.svg",
    sector: "Energy & Infrastructure",
    package: "8 LPA",
    students: 1
  },
  {
    id: 11,
    date: "2024-04-20",
    name: "Kalptaru Projects KPIL",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "5 LPA",
    students: 3
  },
  {
    id: 12,
    date: "2024-04-25",
    name: "RR ISPAT",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Steel & Power",
    package: "6 LPA",
    students: 3
  },
  {
    id: 13,
    date: "2024-04-30",
    name: "Shri Balaji Construction",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "4.5 LPA",
    students: 1
  },
  {
    id: 14,
    date: "2024-05-05",
    name: "Maple Architect",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Architecture",
    package: "4.2 LPA",
    students: 1
  },
  {
    id: 15,
    date: "2023-07-10",
    name: "Ultratech Cement",
    logo: "https://cdn.worldvectorlogo.com/logos/ultratech.svg",
    sector: "Manufacturing",
    package: "7 LPA",
    students: 1
  },
  {
    id: 16,
    date: "2024-05-10",
    name: "Sarthi Associates",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Consulting",
    package: "4 LPA",
    students: 1
  },
  {
    id: 17,
    date: "2024-05-15",
    name: "Utopia Durg",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "4 LPA",
    students: 1
  },
  {
    id: 18,
    date: "2024-05-20",
    name: "Swami Constructions Raipur",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "4 LPA",
    students: 1
  },
  {
    id: 19,
    date: "2024-05-25",
    name: "Chandak & Sharda Associates Durg",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Consulting",
    package: "4.2 LPA",
    students: 1
  },
  {
    id: 20,
    date: "2024-05-30",
    name: "Green Earth Solution Ltd. Raipur",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Environmental Services",
    package: "4.5 LPA",
    students: 1
  },
  {
    id: 21,
    date: "2023-06-15",
    name: "KPIL",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Construction",
    package: "5 LPA",
    students: 3
  },
  {
    id: 22,
    date: "2023-06-20",
    name: "Govt Job Coalfield India",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Government",
    package: "N/A",
    students: 1
  },
  {
    id: 23,
    date: "2023-06-25",
    name: "Govt Job CSPDCL",
    logo: "https://cdn.worldvectorlogo.com/logos/placeholder.svg",
    sector: "Government",
    package: "N/A",
    students: 1
  }
  // Add more entries up to 204 as per your full data set
];


// Define table columns
const columns = [
  {
    name: "S.No",
    selector: (row) => row.id,
    sortable: true,
    width: "80px",
    center: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    width: "120px",
  },
  {
    name: "Company Logo",
    cell: (row) => (
      <div className="flex justify-center">
        <img
          src={row.logo}
          alt={row.name}
          className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border p-1 bg-white shadow-sm"
        />
      </div>
    ),
    width: "120px",
    center: true,
  },
  {
    name: "Company Name",
    selector: (row) => row.name,
    sortable: true,
    cell: (row) => <span className="font-medium text-gray-700">{row.name}</span>,
  },
  {
    name: "Sector",
    selector: (row) => row.sector,
    sortable: true,
    omit: window.innerWidth < 768, // Hide on mobile
  },
  {
    name: "Package (LPA)",
    selector: (row) => row.package,
    sortable: true,
    right: true,
    width: "140px",
  },
  {
    name: "Students Placed",
    selector: (row) => row.students,
    sortable: true,
    right: true,
    width: "150px",
    omit: window.innerWidth < 1024, // Hide on smaller screens
  },
];

// Custom styles for react-data-table-component
const customStyles = {
  header: {
    style: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1E40AF",
      padding: "0 0 1rem 0",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#1E3A8A",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "16px",
      minHeight: "60px",
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      justifyContent: 'flex-start',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      fontSize: "15px",
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #e5e7eb',
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: '#EFF6FF',
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e5e7eb",
      paddingTop: "12px",
      fontSize: "14px",
    },
  },
};

// Custom table header component
const CustomTableHeader = ({ onFilter, onClear, filterText }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 w-full">
      <h2 className="text-3xl font-bold text-center text-blue-900">Companies Visited in 2023-2024</h2>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full md:w-auto justify-center"
          onClick={onClear}
        >
          <FunnelIcon className="h-4 w-4 mr-2" />
          Clear Filter
        </motion.button>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={filterText}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full"
            onChange={(e) => onFilter(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const CompaniesVisitedTable = () => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = companiesData.filter(
    item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <CustomTableHeader 
        onFilter={setFilterText}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        highlightOnHover
        responsive
        customStyles={customStyles}
        striped
        defaultSortFieldId={1}
        sortIcon={<ChevronUpDownIcon className="w-4 h-4" />}
        paginationComponentOptions={{
          rowsPerPageText: 'Rows per page:',
          rangeSeparatorText: 'of',
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: 'All',
        }}
      />
    </div>
  );
};

export default CompaniesVisitedTable;
