import React from 'react';
import { styled } from '@mui/system';
import DropdownIcon from '../../assests/arrow_drop_down (1).svg';
import ArrowBackIcon from '../../assests/arrow_forward_ios (3).svg';
import ArrowForwardIcon from '../../assests/arrow_forward_ios (4).svg';

const PaginationContainer = styled('div')({
  width: '1040px',
  height: '51px',
  position: 'fixed',
  bottom: '0',
  left: '132px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '0px',
  padding: '0 20px',
  zIndex: 1000,
});

const PaginationText = styled('div')({
  fontFamily: 'Futura Md BT',
  fontSize: '16px',
  fontWeight: 400,
  color: '#000000E5',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const DropdownContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
  position: 'relative',
});

const DropdownOptions = styled('div')({
  position: 'absolute',
  top: '30px',
  left: '0',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  overflow: 'hidden',
  zIndex: 10,
});

const DropdownOption = styled('div')({
  padding: '8px 12px',
  fontSize: '14px',
  fontFamily: 'Futura Md BT',
  color: '#000',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
});

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
});

const Pagination = ({ currentPage, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1); // Trigger page change in MainPage
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1); // Trigger page change in MainPage
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleRowsPerPage = (size) => {
    onRowsPerPageChange(size); // Trigger rows per page change in MainPage
    setShowDropdown(false);
  };

  return (
    <PaginationContainer>
      <PaginationText>
        Rows per page:
        <DropdownContainer>
          <span>{rowsPerPage}</span>
          <img src={DropdownIcon} alt="Dropdown" onClick={toggleDropdown} />
          {showDropdown && (
            <DropdownOptions>
              {[10, 20, 50].map((size) => (
                <DropdownOption key={size} onClick={() => handleRowsPerPage(size)}>
                  {size}
                </DropdownOption>
              ))}
            </DropdownOptions>
          )}
        </DropdownContainer>
      </PaginationText>
      <PaginationText>
        {currentPage * rowsPerPage + 1}-{Math.min((currentPage + 1) * rowsPerPage, totalRows)} of {totalRows}
      </PaginationText>
      <IconContainer>
      <img src={ArrowForwardIcon} alt="Next" onClick={handleNext} />
      <img src={ArrowBackIcon} alt="Previous" onClick={handlePrevious} />   
      </IconContainer>
    </PaginationContainer>
  );
};

export default Pagination;

