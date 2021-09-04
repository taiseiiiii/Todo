/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { memo,ReactNode,VFC } from 'react';
import {Header} from '../organisms/layout/Header';

type Props = {
    children:ReactNode;
}

export const HeaderLayout:VFC<Props> = memo((props) => {
	const {children} = props;
	return(
		<>
			<Header />
			{children}
		</>

	);
});