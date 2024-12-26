import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import BatchCard from '../components/Molecules/BatchCard';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import SortByIcon from '../assests/SortBy.svg';
import PrinterIcon from '../assests/Printer (1).svg';
import Apis from '../Utils/APIService/Apis';

const LayoutContainer = styled('div')({
  display: 'flex',
  height: '100vh',
});

const SidebarContainer = styled('div')({
  width: '178px',
  backgroundColor: '#FFFFFF',
  position: 'fixed',
  top: '84px',
  bottom: 0,
  left: 0,
});

const MainContainer = styled('div')({
  flexGrow: 1,
  marginTop: '84px',
  marginLeft: '178px',
  padding: '20px',
  backgroundColor: '#FFFFFF',
});

const TopBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0px',
  marginBottom: '40px',
  marginLeft: '0px',
});

const Button = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '150px',
  height: '44px',
  border: '1px solid #E1BD52',
  fontFamily: 'Futura Bk BT, sans-serif',
  fontSize: '16px',
  color: '#06555C',
  backgroundColor: '#FFFFFF',
  padding: '10px',
  cursor: 'pointer',
  marginLeft: '80px',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#a24463',
    borderWidth: '2px',
  },
});

const Dropdown = styled('div')({
  position: 'absolute',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E1BD52',
  width: '150px',
  zIndex: 1000,
  marginTop: '5px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const DropdownItem = styled('div')({
  padding: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const PrintButton = styled(Button)({
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  width: '108px',
});

const UnblockButton = styled('button')(({ isVisible }) => ({
  width: '128px',
  height: '44px',
  background: isVisible ? '#06555C' : 'transparent',
  color: isVisible ? '#FFFFFF' : 'transparent',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '21.6px',
  textAlign: 'center',
  border: 'none',
  cursor: isVisible ? 'pointer' : 'default',
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 0.3s ease',
  marginLeft: '25px',
}));

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [batchNames, setBatchNames] = useState([]);
  const [selectedBatchName, setSelectedBatchName] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  useEffect(() => {
    Apis.getBatches()
      .then((response) => {
        const batchData = response.data;
        const batchNamesList = [...new Set(batchData.map((batch) => batch.batchName || 'Unknown'))];
        setBatchNames(batchNamesList);

        const formattedBatches = batchData.flatMap((batch) =>
          batch.batchOrderItems.map((item) => ({
            id: batch.batchId,
            batchName: item.orderItem.productName || 'Unknown',
            stationName: batch.stationName || 'Unknown',
            name: item.orderItem.productName || 'Unknown',
            weight: item.orderItem.productSize || 'Unknown',
            quantity: item.orderItem.quantity || 0,
            customizationNotes: item.orderItem.customizationNotes || 'No Notes Available',
            time: item.orderItem.deliveryTime || 'Not Scheduled',
            isChecked: false,
          }))
        );
        setBatches(formattedBatches);
      })
      .catch((error) => console.error('Error fetching batches:', error));
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleBatchSelection = (batchName) => {
    setSelectedBatchName(batchName);
    setIsDropdownVisible(false);

    Apis.getBatches()
      .then((response) => {
        const batchData = response.data.filter((batch) => batch.batchName === batchName);

        const formattedBatches = batchData.flatMap((batch) =>
          batch.batchOrderItems.map((item) => ({
            id: batch.batchId,
            batchName: item.orderItem.batchName || 'Unknown',
            stationName: batch.stationName || 'Unknown',
            name: item.orderItem.productName || 'Unknown',
            weight: item.orderItem.productSize || 'Unknown',
            quantity: item.orderItem.quantity || 0,
            customizationNotes: item.orderItem.customizationNotes || 'No Notes Available',
            time: item.orderItem.deliveryTime || 'Not Scheduled',
            isChecked: false,
          }))
        );
        setBatches(formattedBatches);
      })
      .catch((error) => console.error('Error fetching filtered batches:', error));
  };

  const handleCheckboxChange = (index) => {
    const updatedBatches = [...batches];
    updatedBatches[index].isChecked = !updatedBatches[index].isChecked;
    setBatches(updatedBatches);
    setIsAnyChecked(updatedBatches.some((batch) => batch.isChecked));
  };

  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>

      <MainContainer>
        <TopBarContainer>
          <div style={{ position: 'relative' }}>
            <Button onClick={handleDropdownToggle}>
              {selectedBatchName || 'Batch'}
              <img src={ArrowDropdownIcon} alt="Dropdown" />
            </Button>
            {isDropdownVisible && (
              <Dropdown>
                {batchNames.map((batchName, index) => (
                  <DropdownItem key={index} onClick={() => handleBatchSelection(batchName)}>
                    {batchName}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>
          <Button>
            <img src={CalendarIcon} alt="Calendar" />
            12-11-2024
          </Button>
          <Button>
            Station
            <img src={ArrowDropdownIcon} alt="Dropdown" />
          </Button>
          <Button>
            Sort By
            <img src={SortByIcon} alt="Sort By" />
          </Button>
          <UnblockButton isVisible={isAnyChecked}>Unblock</UnblockButton>
          <PrintButton>
            Print
            <img src={PrinterIcon} alt="Printer" />
          </PrintButton>
        </TopBarContainer>

        {batches.map((batch, index) => (
          <BatchCard key={index} batch={batch} onCheckboxChange={() => handleCheckboxChange(index)} />
        ))}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Batches;


