import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react';
import {
  GROOM_NAME,
  GROOM_ACCOUNT_NUMBER,
  GROOM_FATHER_NAME,
  GROOM_FATHER_ACCOUNT_NUMBER,
  GROOM_MOTHER_NAME,
  GROOM_MOTHER_ACCOUNT_NUMBER,
  BRIDE_NAME,
  BRIDE_ACCOUNT_NUMBER,
} from '../../config'; 
import './style.scss';

const AccordionAccount = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('복사되었습니다: ' + text);
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  };

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionButton>
            <Box flex="1" textAlign="left" className="accordionTitle">
              {item.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} className="accordionPanel">
            <div className='accountContainer'>
              {item.text.map((textItem, idx) => (
                <div key={idx}>
                  <span>{textItem.label}</span>
                  <Button onClick={() => copyToClipboard(textItem.account)}>{textItem.account}</Button>
                </div>
              ))}
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// items 배열에서 동적으로 값을 삽입
const items = [
  {
    value: "a",
    title: "신랑 측",
    text: [
      { label: `${GROOM_NAME} 계좌번호`, account: GROOM_ACCOUNT_NUMBER },
      { label: `아버지 ${GROOM_FATHER_NAME} 계좌번호`, account: GROOM_FATHER_ACCOUNT_NUMBER },
      { label: `어머니 ${GROOM_MOTHER_NAME} 계좌번호`, account: GROOM_MOTHER_ACCOUNT_NUMBER },
    ],
  },
  {
    value: "b",
    title: "신부 측",
    text: [
      { label: `${BRIDE_NAME} 계좌번호`, account: BRIDE_ACCOUNT_NUMBER },
    ],
  },
];

export default AccordionAccount;
