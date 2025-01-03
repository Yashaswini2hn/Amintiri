import React, { useState, useEffect , useRef} from 'react';
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
import 'react-calendar/dist/Calendar.css';


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
  top: '147px',
  left: '360px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '0px',
  padding: '10px',
  width: '300px',
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
 

  const calendarRef = useRef(null);

  const formatBatches = (batchData) => {
    return batchData.flatMap((batch) =>
      batch.batchOrderItems.map((item) => {
        const batchDateTime = batch.batchTime ? new Date(batch.batchTime) : null;
  
        return {
          id: item.id, // Use orderItem.id as the unique identifier
          batchId: batch.batchId, // Keep batchId for reference
          batchName: batch.batchName || "Unknown", // Use the batchName from the batch
          stationName: batch.stationName || "Unknown", // Map stationName
          productName: item.orderItem.productName || "Unknown", // Map productName
          productSize: item.orderItem.productSize || "Unknown", // Map productSize
          quantity: item.orderItem.quantity || 0, // Map quantity
          customizationNotes: item.orderItem.customizationNotes || "No Notes Available", // Map customizationNotes
          deliverySlot: item.orderItem.deliverySlot || "No Slot Available", // Map delivery slot
          orderName: item.orderItem.orderName || "Unknown Order", // Map orderName
          deliveryTime: item.orderItem.deliveryTime
            ? new Date(item.orderItem.deliveryTime).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "Not Scheduled", // Map deliveryTime
          itemStatus: item.orderItem.itemStatus?.status || "Unknown", // Map item status
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
            : "No Date/Time", // Map batchDateTime
          isChecked: false, // Default unchecked
        };
      })
    );
  };
  
  // Example usage when fetching data
  useEffect(() => {
    setIsLoading(true);
    Apis.getBatches()
      .then((response) => {
        const formattedBatches = formatBatches(response.data); // Map batches
        setBatches(formattedBatches); // Update state
      })
      .catch((error) => console.error("Error fetching batches:", error))
      .finally(() => setIsLoading(false));
  }, []);
  
  
  const fetchBatchesByStation = (stationId) => {
    setIsLoading(true);
    // Apis.getBatchesByStation(stationId)
    //   .then((response) => {
    //     setBatches(formatBatches(response.data));
    //   })
    //   .catch((error) => console.error('Error fetching batches by station:', error))
    //   .finally(() => setIsLoading(false));
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
  
  const handleDateChange = (dateOrEvent) => {
  // Check if it's an event or a date object
  const selectedDate =
   dateOrEvent.target && dateOrEvent.target.value
      ? dateOrEvent.target.value // From <input>
      : dateOrEvent.toISOString().split("T")[0]; // From react-calendar

  setSelectedDate(selectedDate);

  // Fetch batches for the selected date
  setIsLoading(true);
  Apis.getBatchesByDate(selectedDate)
    .then((response) => {
      // Format the batches using the existing formatBatches function
      const formattedBatches = formatBatches(response.data);
      const filteredBatches = formattedBatches.filter((batch) => {
        const batchDate = new Date(batch.batchDateTime).toISOString().split("T")[0];
        return batchDate === selectedDate;
      });
      setBatches(filteredBatches);
    })
    .catch((error) => console.error("Error fetching batches by date:", error))
    .finally(() => setIsLoading(false));
};

const getValidDateRange = () => {
  // Filter valid batch times and parse them as Date objects
  const validDates = batches
    .filter((batch) => batch.batchTime) // Exclude invalid times
    .map((batch) => new Date(batch.batchTime));

  if (validDates.length > 0) {
    // Calculate the min and max dates
    const minDate = new Date(Math.min(...validDates));
    const maxDate = new Date(Math.max(...validDates));
    return { minDate, maxDate };
  }

  // If no valid dates, default to enabling all dates
  return { minDate: null, maxDate: null };
};

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
        console.log(response)
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
          <Button onClick={toggleCalendar}>
          <img
          src={CalendarIcon}
          alt="Calendar Icon"
          style={{ width: '24px', height: '24px', marginRight: '10px' }} />
          {selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : 'Select Date'}
          </Button>
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
          <CalendarDropdown isVisible={isCalendarVisible}>
          <Calendar
           onChange={(date) => handleDateChange(date)}
           value={selectedDate ? new Date(selectedDate) : new Date()}
           minDate={minDate || undefined}
           maxDate={maxDate || undefined}/>

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