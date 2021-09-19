/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React, { Children, ReactNode } from 'react';
import { Box, Input, Textarea } from '@chakra-ui/react';
import { memo, useCallback, VFC } from 'react';
import PropTypes from 'prop-types';

type Props = {
    id: number;
    onClick: (id: number) => void;
    isNewCard: boolean;
    content: ReactNode;
};

export const TaskCard: VFC<Props> = memo((props) => {
    const { id, onClick, isNewCard, content } = props;

    return (
        <>
            <Box
                w="268px"
                minH="59.5px"
                bg="#fff"
                ml={4}
                mb={4}
                borderRadius="5px"
                shadow="md"
                p={[6, 8, 2]}
                _hover={{ cursor: 'pointer', bg: 'gray.50' }}
                onClick={isNewCard ? undefined : () => onClick(id)}
                display="table"
            >
                {content}
            </Box>
        </>
    );
});
