/* eslint-disable react/display-name */
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { memo,VFC } from 'react';
import { HomeBotton } from '../../atoms/Homebotton';


export const Header:VFC = memo(() => {
	return(
		<Flex as="nav" bg="rgba(255, 255, 255, 0)"  justify="space-between" align="center">
			<Heading as="h1" m="auto" color="gray" fontSize="25px">TODOアプリ</Heading>
			<Box pr={5}>
				<HomeBotton /> 
			</Box>
		</Flex>
        
	);
});