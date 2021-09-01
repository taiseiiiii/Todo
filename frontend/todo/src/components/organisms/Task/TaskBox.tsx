import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react"
import { memo, ReactNode, VFC } from "react"
import { TaskCard } from "./TaskCard"

type Props = {
    children:ReactNode;
}


export const TaskBox:VFC<Props> = memo((props) => {

    const {children} = props;

    const onClickAdd = () => {

    }
    return (
        <Flex direction="column" 
            w="300px"
            bg="#EDF2F7"
            borderRadius="5px"
            opacity="0.8"
            shadow="sm"
        >
            <Box pl={4} mb={2} fontWeight="bold">ToDo</Box>
            {children}
        </Flex>


    )
});