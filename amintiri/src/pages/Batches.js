import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import BatchCard from '../components/Molecules/BatchCard';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import PrinterIcon from '../assests/Printer (1).svg';
import Apis from '../Utils/APIService/Apis';
import Loader from '../components/Atoms/Loader';
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

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
  gap: '20px',
  marginBottom: '40px',
  marginLeft:'65px'
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
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  marginTop: '5px',
  width: '150px',
});

const DropdownItem = styled('div')({
  padding: '10px',
  fontFamily: 'Futura Lt BT',
  fontSize: '14px',
  color: '#06555C',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

const PrintButton = styled(Button)({
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  marginLeft:'270px'
});

const UnblockButton = styled('button')(({ isDisabled }) => ({
  width: '108px',
  height: '44px',
  backgroundColor: isDisabled ? '#0A616940' : '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '18px',
  marginLeft:'80px',
  textAlign: 'center',
  color: '#FFFFFF',
  border: 'none',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  '&:hover': {
    backgroundColor: isDisabled ? '#0A616940' : '#054E50',
  },
  transition: 'background-color 0.3s ease',
}));

const CalendarDropdown = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  top: '55px',
  left: '0px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '0px',
  padding: '10px',
}));

const PopupOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
});

const PopupBox = styled('div')({
  width: '400px',
  background: '#FFFFFF',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
});

const PopupMessage = styled('p')({
  fontFamily: 'Futura Md BT',
  fontSize: '18px',
  color: '#06555C',
  marginBottom: '20px',
});

const PopupButtonGroup = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  gap: '10px',
});

const CancelButton = styled(Button)({
  backgroundColor: '#FFFFFF',
  color: '#06555C',
  border: '1px solid #E1BD52',
  width: '100px',
});

const ConfirmButton = styled(Button)({
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  width: '100px',
});

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [batchNames, setBatchNames] = useState([]);
  const [selectedBatchName, setSelectedBatchName] = useState('');
  const [isBatchDropdownVisible, setIsBatchDropdownVisible] = useState(false);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [isStationDropdownVisible, setIsStationDropdownVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedOrderItemIds, setSelectedOrderItemIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatBatches = (batchData) => {
    return batchData.flatMap((batch) =>
      batch.batchOrderItems.map((item) => {
        const batchDateTime = batch.batchTime ? new Date(batch.batchTime) : null;
  
        return {
          id: item.id, // Use orderItem.id instead of batch.batchId
          batchId: batch.batchId, // Keep batchId for display purposes
          batchName: item.orderItem.orderName || "Unknown", // Map orderName to batchName
          stationName: batch.stationName || "Unknown",
          name: item.orderItem.productName || "Unknown",
          weight: item.orderItem.productSize || "Unknown",
          quantity: item.orderItem.quantity || 0,
          customizationNotes: item.orderItem.customizationNotes || "No Notes Available",
          batchDateTime: batchDateTime
            ? `${batchDateTime.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })} ${batchDateTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}`
            : "No Date/Time",
          time: item.orderItem.deliveryTime
            ? `${new Date(item.orderItem.deliveryTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })} ${new Date(item.orderItem.deliveryTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}`
            : "Not Scheduled",
          isChecked: false,
        };
      })
    );
  };
  
  const fetchBatchesByStation = (stationId) => {
    setIsLoading(true);
    Apis.getBatchesByStation(stationId)
      .then((response) => {
        setBatches(formatBatches(response.data));
      })
      .catch((error) => console.error('Error fetching batches by station:', error))
      .finally(() => setIsLoading(false));
  };

  const fetchBatchesByBatchName = (batchName) => {
    setIsLoading(true);
    Apis.getBatches()
      .then((response) => {
        const filteredBatches = response.data.filter((batch) => batch.batchName === batchName);
        setBatches(formatBatches(filteredBatches));
      })
      .catch((error) => console.error('Error fetching batches by batch name:', error))
      .finally(() => setIsLoading(false));
  };

  const handleBatchSelection = (batchName) => {
    setSelectedBatchName(batchName);
    setIsBatchDropdownVisible(false);
    fetchBatchesByBatchName(batchName);
  };

  const handleStationSelection = (stationName, stationId) => {
    setSelectedStation(stationName);
    setIsStationDropdownVisible(false);
    fetchBatchesByStation(stationId);
  };


const toggleCalendar = () => {
  setIsCalendarVisible((prev) => !prev);
};
  
const handleDateChange = (date) => {
  setSelectedDate(date);
  const formattedDate = date.toISOString().split("T")[0];

  // Fetch batches based on the selected date
  Apis.getBatchesByDate(formattedDate)
    .then((response) => {
      setBatches(
        response.data.filter((batch) => {
          const batchDate = new Date(batch.batchTime).toISOString().split("T")[0];
          return batchDate === formattedDate;
        })
      );
    })
    .catch((error) => console.error("Error fetching batches by date:", error));
};
  
  const getValidDateRange = () => {
    // Ensure valid batch times and prevent incorrect calculations
    const validDates = batches
      .filter((batch) => batch.batchTime) // Exclude invalid dates
      .map((batch) => new Date(batch.batchTime));
    const minDate = validDates.length > 0 ? new Date(Math.min(...validDates)) : new Date();
    const maxDate = validDates.length > 0 ? new Date(Math.max(...validDates)) : new Date();
  
    return { minDate, maxDate };
  };
  
  // Get the minDate and maxDate dynamically
  const { minDate, maxDate } = getValidDateRange();     


  

  // const handleCheckboxChange = (index) => {
  //   const updatedBatches = batches.map((batch, idx) =>
  //     idx === index ? { ...batch, isChecked: !batch.isChecked } : batch
  //   );
  //   setBatches(updatedBatches);

  //   const selectedIds = updatedBatches
  //     .filter((batch) => batch.isChecked)
  //     .map((batch) => batch.id);

  //   setSelectedOrderItemIds(selectedIds);

  //   setIsAnyChecked(selectedIds.length >= 3); // Enable button if at least 3 are selected
  // };   

  const handleCheckboxChange = (index) => {
    const updatedBatches = batches.map((batch, idx) =>
      idx === index ? { ...batch, isChecked: !batch.isChecked } : batch
    );
    setBatches(updatedBatches);
  
    const selectedIds = updatedBatches
      .filter((batch) => batch.isChecked)
      .map((batch) => batch.id); // Collect unique item IDs
  
    setSelectedOrderItemIds([...new Set(selectedIds)]); // Ensure unique IDs
    setIsAnyChecked(selectedIds.length >= 3); // Enable button if at least 3 are selected
  };
  

  const handleUnblockClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    console.log("selectedOrderItemIds ...", selectedOrderItemIds);
    Apis.unbatch(selectedOrderItemIds)
      .then(() => {
        alert('Orders unbatched successfully.');
        setBatches((prev) =>
          prev.filter((batch) => !selectedOrderItemIds.includes(batch.id))
        );
        setSelectedOrderItemIds([]);
        setIsAnyChecked(false);
      })
      .catch((error) => {
        console.error('Error unbatching:', error);
        alert('Failed to unbatch. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
        setIsPopupVisible(false);
      });
  };
  

  useEffect(() => {
    setIsLoading(true);
    Apis.getStations()
      .then((response) => {
        setStations(response.data);
        if (response.data.length > 0) {
          const firstStation = response.data[0];
          setSelectedStation(firstStation.name);
          fetchBatchesByStation(firstStation.id);
        }
      })
      .catch((error) => console.error('Error fetching stations:', error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    Apis.getBatches()
      .then((response) => {
        setBatchNames([...new Set(response.data.map((batch) => batch.batchName || 'Unknown'))]);
      })
      .catch((error) => console.error('Error fetching batch names:', error));
  }, []);

  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <Loader isLoading={isLoading} />
      <MainContainer>
        <TopBarContainer>
          {/* Batch Dropdown */}
          <div style={{ position: 'relative', }}>
            <Button onClick={() => setIsBatchDropdownVisible((prev) => !prev)} style={{width:'200px'}}>
              {selectedBatchName || 'Batch'}
              <img src={ArrowDropdownIcon} alt="Dropdown Icon" />
            </Button>
            {isBatchDropdownVisible && (
              <Dropdown>
                {batchNames.map((batchName, index) => (
                  <DropdownItem key={index} onClick={() => handleBatchSelection(batchName)}>
                    {batchName}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>
          <Button onClick={toggleCalendar}>
          <img
           src={CalendarIcon}
           alt="Calendar Icon"
           style={{ width: '24px', height: '24px', marginRight: '10px' }}
            />
          {selectedDate || 'Select Date'}
          </Button>

          <CalendarDropdown isVisible={isCalendarVisible}>
          <Calendar
          onChange={handleDateChange}
          value={new Date(selectedDate)}
    minDate={minDate} // Set minimum date based on batches
    maxDate={maxDate} // Set maximum date based on batches
  />
</CalendarDropdown>


          {/* Station Dropdown */}
          <div style={{ position: 'relative' }}>
            <Button onClick={() => setIsStationDropdownVisible((prev) => !prev)}>
              {selectedStation || 'Station'}
              <img src={ArrowDropdownIcon} alt="Dropdown Icon" />
            </Button>
            {isStationDropdownVisible && (
              <Dropdown>
                {stations.map((station) => (
                  <DropdownItem
                    key={station.id}
                    onClick={() => handleStationSelection(station.name, station.id)}
                  >
                    {station.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>

          <UnblockButton
            isDisabled={!isAnyChecked}
            disabled={!isAnyChecked}
            onClick={handleUnblockClick}
          >
            Unblock
          </UnblockButton>
          <PrintButton>
            Print
            <img src={PrinterIcon} alt="Printer Icon" />
          </PrintButton>
        </TopBarContainer>

        {batches.map((batch, index) => (
          <BatchCard
            key={index}
            batch={batch}
            onCheckboxChange={() => handleCheckboxChange(index)}
          />
        ))}

        {/* Popup */}
        {isPopupVisible && (
          <PopupOverlay>
            <PopupBox>
              <PopupMessage>Are you sure you want to unblock?</PopupMessage>
              <PopupButtonGroup>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
              </PopupButtonGroup>
            </PopupBox>
          </PopupOverlay>
        )}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Batches;