import React from 'react';
import { useToast, Box, Text } from '@chakra-ui/react';

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
          borderRadius="md"
          mb={4}
        >
          <Text>{description}</Text>
        </Box>
      ),
      duration: 1500,
      isClosable: true,
    });
  };

  return { showToast };
};

export default ToastNotification;
