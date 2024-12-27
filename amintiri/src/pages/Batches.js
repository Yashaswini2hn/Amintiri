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
import Loader from '../components/Atoms/Loader';
import Calendar from 'react-calendar';

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

const BatchDropdown = styled('div')({
  position: 'absolute',
  backgroundColor: '#FFFFFF',
  // border: '1px solid #E1BD52',
  boxShadow: '0px 4px 4px 0px #00000040',
  zIndex: 1000,
  width: '220px',
  marginTop: '0px',
  marginLeft:'80px'
});

const BatchDropdownInner = styled('div')({
  backgroundColor: '#FFFFFF',
  border: '0.8px solid #E1BD52',
  margin: '8px',
  padding: '8px',
});

const BatchDropdownItem = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16.8px',
  color: '#06555C',
  padding: '8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});


const PrintButton = styled(Button)({
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  width: '108px',
  marginLeft:'350px'
});

const UnblockButton = styled('button')(({ isDisabled }) => ({
  width: '108px',
  height: '44px',
  position: 'absolute',
  top: '104px',
  left: '1000px',
  backgroundColor: isDisabled ? '#0A616940' : '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '18px',
  textAlign: 'center',
  color: '#FFFFFF',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: isDisabled ? '#0A616940' : '#054E50',
  },
  transition: 'background-color 0.3s ease',
}));


const StationDropdown = styled('div')({
  position: 'absolute',
  width: '150px',
  height: '100px',
  marginTop:'45px',
  marginLeft:'80px',
  gap: '0px',
  opacity: '1',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040',
  zIndex: 1000,
});

const StationDropdownInner = styled('div')({
  width: '135px',
  height: '80px',
  top: '191px',
  left: '256px',
  gap: '0px',
  border: '0.8px solid #E1BD52',
  opacity: '1',
  margin: '8px',
});

const StationDropdownItem = styled('div')({
  fontFamily: 'Futura Lt BT',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  color: '#0A6169',
  padding: '8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#06555C',
  },
});


const PopupOverlay = styled('div')({
  width: '100%',
  height: '100%',
  background: '#000000CC',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1,
});

const PopupBox = styled('div')({
  width: '568px',
  height: '214px',
  background: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '20px',
});

const PopupMessage = styled('p')({
  fontFamily: 'Futura Md BT',
  fontSize: '24px',
  fontWeight: 400,
  lineHeight: '36px',
  textAlign: 'left',
  color: '#06555C',
});

const PopupButtonGroup = styled('div')({
  display: 'flex',
  gap: '20px',
});

const CancelButton = styled('button')({
  width: '135px',
  height: '46px',
  border: '1px solid #0A6169',
  background: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '17.98px',
  textAlign: 'center',
  color: '#000000',
  cursor: 'pointer',
});

const UnbatchButton = styled('button')({
  width: '135px',
  height: '46px',
  border: '1px solid #0A6169',
  background: '#0A6169',
  fontFamily: 'Futura Bk BT',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '17.98px',
  textAlign: 'center',
  color: '#FFFFFF',
  cursor: 'pointer',
});

const CalendarDropdown = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  top: '150px',
  left: '490px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  borderRadius: '0px',
  padding: '10px',
  width: '300px', 
}));

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [batchNames, setBatchNames] = useState([]);
  const [selectedBatchName, setSelectedBatchName] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState('');
  const [isStationDropdownVisible, setIsStationDropdownVisible] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [stationDropdownPosition, setStationDropdownPosition] = useState({ top: 0, left: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] + "T00:00:00"
  );
  
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handleDateChange = (date) => {
    console.log("Selected Date from Calendar:", date);
    const formattedDate = date.toISOString().split('T')[0] + "T00:00:00";
    console.log("Formatted Date:", formattedDate); 
    setSelectedDate(formattedDate); 
    setIsCalendarVisible(false); 
    // fetchOrdersByDate(formattedDate); 
  };

  useEffect(() => {
    setIsLoading(true);
    Apis.getBatches()
      .then((response) => {
        const batchData = response.data;
        const batchNamesList = [...new Set(batchData.map((batch) => batch.batchName || 'Unknown'))];
        setBatchNames(batchNamesList);

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
      .catch((error) => console.error('Error fetching batches:', error))
      .finally(() => {
        setIsLoading(false); 
      });
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
    const updatedBatches = batches.map((batch, idx) =>
      idx === index ? { ...batch, isChecked: !batch.isChecked } : batch
    );
    setBatches(updatedBatches);
    const selectedCount = updatedBatches.filter((batch) => batch.isChecked).length;
    setIsAnyChecked(selectedCount >= 3); 
  };
  

  const handleStationDropdownToggle = () => {
    setIsStationDropdownVisible(!isStationDropdownVisible);
  };

  const handleStationSelection = (station) => {
    setSelectedStation(station);
    setIsStationDropdownVisible(false);
  };


  const handleUnblockClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleUnbatch = () => {
    const selectedBatchIds = batches
      .filter((batch) => batch.isChecked)
      .map((batch) => batch.id);
  
    if (selectedBatchIds.length < 3) {
      alert('Select at least 3 batches to unbatch.');
      return;
    }
  
    const payload = {
      batchIds: selectedBatchIds,
    };
  
    console.log('Payload:', payload);
  
    Apis.unbatch(payload)
      .then((response) => {
        alert('Unbatched Successfully');
        setBatches((prevBatches) =>
          prevBatches.filter((batch) => !selectedBatchIds.includes(batch.id))
        );
        setIsPopupVisible(false);
      })
      .catch((error) => {
        console.error('Error in unbatch API:', error);
        alert('Failed to unbatch. Please check the data and try again.');
      });
  };
  


  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <Loader isLoading={isLoading} />
      <MainContainer>
        <TopBarContainer>
          <div style={{ position: 'relative' , }}>
            <Button onClick={handleDropdownToggle} style={{width:'220px'}}>
              {selectedBatchName || 'Batch'}
              <img src={ArrowDropdownIcon} alt="Dropdown" />
            </Button>
            {isDropdownVisible && (
              <BatchDropdown>
                <BatchDropdownInner>
                  {batchNames.map((batchName, index) => (
                    <BatchDropdownItem key={index} onClick={() => handleBatchSelection(batchName)}>
                      {batchName}
                    </BatchDropdownItem>
                  ))}
                </BatchDropdownInner>
              </BatchDropdown>
            )}
          </div>
          <Button onClick={toggleCalendar}>
          <img
              src={CalendarIcon}
              alt="Calendar Icon"
              style={{ width: '24px', height: '24px', marginRight: '10px' }}
            />
            {selectedDate ? selectedDate.split('T')[0] : 'Select Date'}
          </Button>
          <CalendarDropdown isVisible={isCalendarVisible}>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </CalendarDropdown>
          <div style={{ position: 'relative' }}>
          <Button onClick={handleStationDropdownToggle}>
          {selectedStation || 'Station'}
              <img src={ArrowDropdownIcon} alt="Dropdown" />
          </Button>
          {isStationDropdownVisible && (
              <StationDropdown  style={{
                position: 'absolute',
                top: `${stationDropdownPosition.top}px`,
                left: `${stationDropdownPosition.left}px`,
              }}>
                <StationDropdownInner>
                  <StationDropdownItem onClick={() => handleStationSelection('Station A')}>
                    Station A
                  </StationDropdownItem>
                  <StationDropdownItem onClick={() => handleStationSelection('Station B')}>
                    Station B
                  </StationDropdownItem>
                </StationDropdownInner>
              </StationDropdown>
            )}
            </div>
          {/* <Button>
            Sort By
            <img src={SortByIcon} alt="Sort By" />
          </Button> */}
          <UnblockButton isVisible={isAnyChecked} onClick={isAnyChecked ? handleUnblockClick : null}>Unblock</UnblockButton>
          <PrintButton>
            Print
            <img src={PrinterIcon} alt="Printer" />
          </PrintButton>
        </TopBarContainer>

        {batches.map((batch, index) => (
          <BatchCard key={index} batch={batch} onCheckboxChange={() => handleCheckboxChange(index)} />
        ))}

        {isPopupVisible && (
          <PopupOverlay>
            <PopupBox>
              <PopupMessage>Are you sure you want to Unbatch the orders?</PopupMessage>
              <PopupButtonGroup>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <UnbatchButton onClick={handleUnbatch}>Unbatch </UnbatchButton>
              </PopupButtonGroup>
            </PopupBox>
          </PopupOverlay>
        )}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Batches;


