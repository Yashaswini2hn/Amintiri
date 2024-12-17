import React from 'react';
import { styled } from '@mui/system';
import DeliveryIcon from '../../assests/delivery.svg';
import ScrollIcon from '../../assests/Scroll.svg';

const CardContainer = styled('div')({
  width: '90%',
  backgroundColor: '#FFFFFF',
  marginBottom: '30px',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
  display: 'flex',
  gap:'10px',
  marginLeft:'40px',
  boxShadow: '0px 4px 4px 0px #00000026'

});

const CheckboxContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginRight: '15px',
});

const Checkbox = styled('input')({
    appearance: 'none',
    position: 'absolute',
    top: '-15px',
    left: '10px',
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
  

const BatchInfo = styled('div')({
  flex: 1,
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const BatchNumber = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: '700',
  color: '#000000',
});

const Tag = styled('div')(({ backgroundColor }) => ({
  backgroundColor,
  color: backgroundColor === '#06555C' ? '#FFFFFF' : '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  padding: '4px 8px',
  borderRadius: '4px',
}));

// Separate styles for item name, weight, and quantity
const ItemName = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#000000',
});

const ItemWeight = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#06555C',
  marginLeft: '290px', // Add space between name and weight
});

const ItemQuantity = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#383838',
  marginLeft: '130px', // Add space between weight and quantity
});

const Description = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#383838',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '5px',
});

const Footer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '10px',
});

const DeliveryIconImage = styled('img')({
  width: '20px',
  height: '20px',
});

const ScrollIconContainer = styled('img')({
  width: '20px',
  height: '20px',
});

const Time = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#06555C',
});

const BatchCard = ({ batch , onCheckboxChange }) => {
  return (
    <CardContainer>
      <CheckboxContainer>
        <Checkbox type="checkbox"
         checked={batch.isChecked}
         onChange={onCheckboxChange}/>
      </CheckboxContainer>

      <BatchInfo>
        {/* Header */}
        <Header>
          <BatchNumber>{batch.id}</BatchNumber>
          <Tag backgroundColor="#0A616940;">21/10 Batch</Tag>
          <Tag backgroundColor="#E1BD5280">Station A</Tag>
        </Header>

        {/* Item name, weight, and quantity */}
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <ItemName>{batch.name}</ItemName>
          <ItemWeight>{batch.weight}</ItemWeight>
          <ItemQuantity>{batch.quantity}</ItemQuantity>
        </div>

        {/* Description */}
        <Description>
          <ScrollIconContainer src={ScrollIcon} alt="Scroll Icon" />
          Lorem ipsum dolor sit amet consectetur. Tempor cras ame....
        </Description>

        {/* Footer */}
        <Footer>
          <DeliveryIconImage style={{marginTop:'-130px'}} src={DeliveryIcon} alt="Delivery Icon" />
          <Time style={{marginTop:'-130px'}}>{batch.time}</Time>
        </Footer>
      </BatchInfo>
    </CardContainer>
  );
};

export default BatchCard;
