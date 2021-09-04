import React from 'react';
import { Calender } from '../components/pages/Calender';
import { Home } from '../components/pages/Home';
import { Page404 } from '../components/pages/Page404';
import { TaskManagement } from '../components/pages/TaskManagement';

export const HomeRoutes = [
    {
        path: '/',
        exact: true,
        children: <Home />,
    },
    {
        path: '/task',
        exact: true,
        children: <TaskManagement />,
    },
    {
        path: '/calender',
        exact: true,
        children: <Calender />,
    },
    {
        path: '*',
        exact: false,
        children: <Page404 />,
    },
];
