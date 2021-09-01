import React from "react";
import { Box } from "@chakra-ui/react"
import { memo, useCallback, VFC } from "react";

type Props = {
    onClick: () => void;
    title:String;
    isNewCard:boolean;
}


export const TaskCard:VFC<Props> = memo((props) => {

    const {onClick, title, isNewCard} = props;

    return (
        <>
            <Box 
                w="268px" 
                h="59.5px" 
                bg="#fff"
                ml={4}
                mb={4}
                borderRadius="5px"
                shadow="md"
                p={[6,8,2]}
                _hover={{ cursor: "pointer", bg:"gray.50" }}
                onClick={onClick}
            >
                <span>{title}</span>
            </Box>
        </>
    );
})