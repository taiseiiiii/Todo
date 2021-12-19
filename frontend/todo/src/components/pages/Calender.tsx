/* eslint-disable react/display-name */
import axios from 'axios';
import React, { useState } from 'react';
import { memo, VFC } from 'react';

export const Calender: VFC = memo(() => {
    const REST_API_URL = 'http://localhost:8080/test/hello';
    const [test, setTest] = useState();

    const getTest = () => {
        const a = 6;
        axios.get(REST_API_URL).then((res) => alert(res.data));
        // →corsエラーが原因っぽい!!! 参考→https://qiita.com/hgaiji/items/fabe6a23d564b20ad558
        return test;
    };

    const fftest = () => {
        alert('test');
    };

    return (
        <>
            <button onClick={getTest}>push</button>
            {/* <button onClick={fftest}>test</button> */}
        </>
    );
});
