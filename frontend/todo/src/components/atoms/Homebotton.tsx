import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";


export const HomeBotton = () => {
    return (
        <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Home Button"
            fontSize="20px"
            icon={<FaHome />}
            borderRadius="8px"
            border="none"
            bg="rgba(255, 255, 255, 0)"
        /> 
    );
}