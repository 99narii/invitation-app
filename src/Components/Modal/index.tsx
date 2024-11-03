import React from 'react';
import { useToast, Box, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

const ToastNotification = () => {
  const toast = useToast();

  const showToast = (description: string, backgroundColor: string = "blue.500") => {
    toast({
      render: () => (
        <Box
          color="white"
          p={3}
          bg={backgroundColor}
          borderRadius="30px"
          mb={4}
          border="1px"
          borderColor="#EEEEEE"
          textAlign='center'
        >
            <Text>
                <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '8px' }} /> 
                <span>{description}</span>
            </Text>
        </Box>
      ),
      duration: 1500,
      isClosable: true,
    });
  };

  return { showToast };
};

export default ToastNotification;
