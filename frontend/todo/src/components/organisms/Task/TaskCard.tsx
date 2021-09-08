/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react';
import { Box, Input, Textarea } from '@chakra-ui/react';
import { memo, useCallback, VFC } from 'react';
import PropTypes from 'prop-types';

type Props = {
    onClick?: () => void;
    title: string;
    isNewCard: boolean;
    setTaskCards: any;
};

export const TaskCard: VFC<Props> = memo((props) => {
    const { onClick, title, isNewCard, setTaskCards } = props;

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
                onClick={isNewCard ? undefined : onClick}
                display="table"
            >
                {isNewCard ? (
                    //なんでこれhだとダメでminHだと高さ指定できるんだろ。。。
                    <Textarea minH="43.5" p={0} resize="none" overflow="hidden" variant="unstyled" />
                ) : (
                    <span>{title}</span>
                )}
            </Box>
        </>
    );
});
