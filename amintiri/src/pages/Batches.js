import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import HeaderTemplate from "../components/Templates/HeaderTemplate";
import SidebarTemplate from "../components/Templates/SidebarTemplate";
import BatchCard from "../components/Molecules/BatchCard";
import ArrowDropdownIcon from "../assests/arrow_drop_down (1).svg";
import CalendarIcon from "../assests/calender.svg";
import PrinterIcon from "../assests/Printer (1).svg";
import Apis from "../Utils/APIService/Apis";
import Loader from "../components/Atoms/Loader";
import Calendar from "react-calendar";

const LayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const SidebarContainer = styled("div")({
  width: "178px",
  backgroundColor: "#FFFFFF",
  position: "fixed",
  top: "84px",
  bottom: 0,
  left: 0,
});

const MainContainer = styled("div")({
  flexGrow: 1,
  marginTop: "84px",
  marginLeft: "178px",
  padding: "20px",
  backgroundColor: "#FFFFFF",
});

const TopBarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  marginBottom: "40px",
});

const Button = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "150px",
  height: "44px",
  border: "1px solid #E1BD52",
  fontFamily: "Futura Bk BT, sans-serif",
  fontSize: "16px",
  color: "#06555C",
  backgroundColor: "#FFFFFF",
  marginLeft:'40px',
  padding: "10px",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: "#a24463",
    borderWidth: "2px",
  },
});

const Dropdown = styled("div")({
  position: "absolute",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 4px 4px 0px #00000040",
  zIndex: 1000,
  width: "220px",
  marginTop: "10px",
});

const DropdownItem = styled("div")({
  padding: "10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const PrintButton = styled(Button)({
  backgroundColor: "#06555C",
  color: "#FFFFFF",
  width: "108px",
});

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [stations, setStations] = useState([]);
  const [batchNames, setBatchNames] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [isBatchDropdownVisible, setIsBatchDropdownVisible] = useState(false);
  const [isStationDropdownVisible, setIsStationDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);

  const formatBatches = (batchData) => {
    return batchData.flatMap((batch) =>
      batch.batchOrderItems.map((item) => ({
        id: batch.batchId,
        batchName: item.orderItem.batchName || "Unknown",
        stationName: batch.stationName || "Unknown",
        name: item.orderItem.productName || "Unknown",
        weight: item.orderItem.productSize || "Unknown",
        quantity: item.orderItem.quantity || 0,
        customizationNotes: item.orderItem.customizationNotes || "No Notes Available",
        time: item.orderItem.deliveryTime || "Not Scheduled",
      }))
    );
  };

  useEffect(() => {
    setIsLoading(true);
    // Fetch stations and batches for the first station
    Apis.getStations()
      .then((response) => {
        setStations(response.data);
        const firstStationId = response.data[0]?.id;
        const firstStationName = response.data[0]?.name;
        if (firstStationId) {
          setSelectedStation(firstStationName);
          fetchBatchesByStation(firstStationId);
        }
      })
      .catch((error) => console.error("Error fetching stations:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchBatchesByStation = (stationId) => {
    setIsLoading(true);
    Apis.getBatches({ stationId })
      .then((response) => {
        setBatches(formatBatches(response.data));
      })
      .catch((error) => console.error("Error fetching batches by station:", error))
      .finally(() => setIsLoading(false));
  };

  const handleBatchSelection = (batchName) => {
    setSelectedBatch(batchName);
    setIsBatchDropdownVisible(false);
    const filteredBatches = batches.filter((batch) => batch.batchName === batchName);
    setBatches(filteredBatches);
  };

   const fetchBatchesByStation2 = (stationId) => {
    setIsLoading(true);
    Apis.getBatchesByStation( stationId )
      .then((response) => {
        setBatches(formatBatches(response.data));
      })
      .catch((error) => console.error("Error fetching batches by station:", error))
      .finally(() => setIsLoading(false));
  };
  

  const handleStationSelection = (stationName, stationId) => {
    setSelectedStation(stationName);
    setIsStationDropdownVisible(false);
    fetchBatchesByStation2(stationId);

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
          {/* Batch Dropdown */}
          <div style={{ position: "relative" }}>
            <Button onClick={() => setIsBatchDropdownVisible((prev) => !prev)}>
              {selectedBatch || "Batch"}
              <img src={ArrowDropdownIcon} alt="Dropdown" />
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

          {/* Calendar Dropdown */}
          <Button onClick={() => setIsCalendarVisible((prev) => !prev)}>
            <img src={CalendarIcon} alt="Calendar Icon" style={{ marginRight: "10px" }} />
            {selectedDate}
          </Button>

          {/* Station Dropdown */}
          <div style={{ position: "relative" }}>
            <Button onClick={() => setIsStationDropdownVisible((prev) => !prev)}>
              {selectedStation || "Station"} 
              <img src={ArrowDropdownIcon} alt="Dropdown" />
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

          <PrintButton>Print</PrintButton>
        </TopBarContainer>

        {batches.map((batch, index) => (
          <BatchCard key={index} batch={batch} />
        ))}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Batches;
