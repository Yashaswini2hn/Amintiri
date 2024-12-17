import React from 'react';
import { styled } from '@mui/system';
import menIcon from '../../assests/men.svg';
import bikeIcon from '../../assests/bike.svg';
import handCoinsIcon from '../../assests/HandCoins.svg';
import dlIcon from '../../assests/DL.svg';

const CardContainer = styled('div')({
  width: '981px', // Corrected width
  height: '133px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '4px 0px 0px 0px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000026',
  padding: '20px',
  marginBottom: '20px',
});

const Checkbox = styled('input')({
  appearance: 'none',
  position: 'absolute',
  top: '20px',
  left: '20px', // Adjusted position for consistency
  width: '24px',
  height: '24px',
  border: '2px solid #06555C',
  borderRadius: '2.5px',
  boxShadow: '0px 0px 4px 0px #00000040',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  '&:checked': {
    backgroundColor: '#06555C',
    border: '2px solid #06555C',
  },
  '&:checked::after': {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '6.5px',
    width: '8px',
    height: '16px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  },
  '&:hover': {
    border: '2px solid #054E50',
  },
});

const DetailsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '80px', // Adjusted margin for alignment
  gap: '4px',
});

const Name = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  color: '#000000',
});

const InfoText = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  color: '#383838',
  lineHeight: '16.8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const RightContainer = styled('div')({
  marginLeft: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px', // Added consistent spacing
});

const RightText = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: 400,
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const HighlightedText = styled(RightText)({
  color: '#06555C',
});

const ExecutiveCard = () => {
  return (
    <CardContainer>
      {/* Checkbox */}
      <Checkbox type="checkbox" />

      {/* Left Section */}
      <DetailsContainer>
        <Name>Ramesh Yadav</Name>
        <InfoText>
          9145687994 <img src={menIcon} alt="Men Icon" />
          Men
        </InfoText>
        <InfoText>#51, 2nd Cross, Kuvempu Nagar, Bengaluru</InfoText>
      </DetailsContainer>

      {/* Right Section */}
      <RightContainer>
        <RightText>
          <img src={bikeIcon} alt="Bike Icon" />
          Bike
        </RightText>
        <HighlightedText>
          <img src={handCoinsIcon} alt="Hand Coins Icon" />
          1120
        </HighlightedText>
        <RightText>
          <img src={dlIcon} alt="Driving Licence Icon" />
          Driving Licence
        </RightText>
      </RightContainer>
    </CardContainer>
  );
};

export default ExecutiveCard;
