import React from 'react';
import { styled } from '@mui/system';
import DropdownIcon from '../../assests/arrow_drop_down (1).svg'; 
import ArrowBackIcon from '../../assests/arrow_forward_ios (3).svg'; 
import ArrowForwardIcon from '../../assests/arrow_forward_ios (4).svg'; 

const PaginationContainer = styled('div')({
  width: '1005px', 
  height: '51px',
  position: 'fixed', 
  bottom: '0', 
  left: '0', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  opacity: 1,
  borderRadius: '0px', 
  padding: '0 20px', 
  zIndex: 1000,
  marginLeft:'130px',
  '@media (min-width:1200px)' : {
    width:'1340px'
  },
  '@media (min-width:768px)' : {
    width:'1025px' 
  }
});

const PaginationText = styled('div')({
  fontFamily: 'Futura Md BT',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '19.18px',
  color: '#000000E5',
  display: 'flex',
  alignItems: 'center',
});

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
});

const DropdownText = styled('span')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginLeft: '8px',
});

// Pagination Component
const Pagination = ({ currentPage, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  const handleRowsPerPage = (newSize) => {
    onRowsPerPageChange(newSize);
  };

  return (
    <PaginationContainer>
      <PaginationText>
        Rows per page:
        <DropdownText onClick={() => handleRowsPerPage(10)}>10</DropdownText>
        <DropdownText onClick={() => handleRowsPerPage(20)}>20</DropdownText>
      </PaginationText>
      <PaginationText>
        {currentPage * rowsPerPage + 1}-{Math.min((currentPage + 1) * rowsPerPage, totalRows)} of {totalRows}
      </PaginationText>
      <IconContainer>
        <img src={ArrowForwardIcon} alt="Previous" onClick={handlePrevious} />
        <img src={ArrowBackIcon} alt="Next" onClick={handleNext} />
      </IconContainer>
    </PaginationContainer>
  );
};

export default Pagination;


