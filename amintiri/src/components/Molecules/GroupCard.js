import React from 'react';
import { styled } from '@mui/system';
import DeliveryIcon from '../../assests/delivery.svg';
import OrdersIcon from '../../assests/orders.svg';

const CardContainer = styled('div')({
  width: '70%',
  background: '#FFFFFF',
  borderRadius: '4px 0px 0px 0px',
  boxShadow: '0px 4px 4px 0px #00000026',
  marginBottom: '20px',
  position: 'relative',
  padding: '20px',
});

const Checkbox = styled('input')({
  appearance: 'none',
  position: 'absolute',
  top: '20px',
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
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  marginLeft: '50px',
});

const Title = styled('div')({
  fontFamily: 'Istok Web',
  fontSize: '24px',
  fontWeight: 700,
  color: '#000000',
  marginTop: '10px', // Add gap below checkbox
});

const HorizontalLine = styled('div')({
  width: '100%',
  borderTop: '0.8px solid #38383880',
  margin: '10px 0',
});

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SubHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const SubTitle = styled('span')({
  fontFamily: 'Istok Web',
  fontSize: '18px',
  fontWeight: 700,
  color: '#000000',
});

const Badge = styled('div')({
  background: '#0A616940',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#06555C',
  padding: '2px 8px',
  borderRadius: '4px',
});

const ItemDetails = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '10px',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#000000',
  lineHeight: '24px',
});

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '10px',
});

const Icon = styled('img')({
  width: '20px',
  height: '20px',
});

const Time = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#000000',
});

const GroupCard = ({ group }) => {
  return (
    <CardContainer>
      <Checkbox type="checkbox" />
      <Header>
        <Title>{group.title}</Title>
      </Header>
      <HorizontalLine />
      <Row>
        <SubHeader>
          <SubTitle>{group.subTitle}</SubTitle>
          <Badge>{group.badge}</Badge>
        </SubHeader>
        <IconContainer>
          <Icon src={OrdersIcon} alt="Orders" />
          <Icon src={DeliveryIcon} alt="Delivery" />
          <Time>2:00pm</Time>
        </IconContainer>
      </Row>
      <ItemDetails>
        <span>{group.itemName}</span>
        <span>{group.weight}</span>
        <span>{group.quantity}</span>
      </ItemDetails>
      <HorizontalLine />
      <Row>
        <SubHeader>
          <SubTitle>{group.subTitle2}</SubTitle>
          <Badge>{group.badge2}</Badge>
        </SubHeader>
        <IconContainer>
          <Icon src={OrdersIcon} alt="Orders" />
          <Icon src={DeliveryIcon} alt="Delivery" />
          <Time>2:00pm</Time>
        </IconContainer>
      </Row>
      <ItemDetails>
        <span>{group.itemName2}</span>
        <span>{group.weight2}</span>
        <span>{group.quantity2}</span>
      </ItemDetails>
    </CardContainer>
  );
};

export default GroupCard;
