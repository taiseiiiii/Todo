/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { memo, useCallback, VFC } from 'react';
import { TaskBox } from '../organisms/Task/TaskBox';
import { HeaderLayout } from '../templates/HeaderLayout';
import { Box, Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { TaskCard } from '../organisms/Task/TaskCard';
import { TaskDetailModal } from '../organisms/Task/TaskDetailModal';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const TaskManagement: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    //本来java側から送られてくる値TODOこの配列自体の型の指定どうしようか
    //初期表示時に値を取ってくる処理に関してはuseEffectを使う→都度調べて
    // const taskCards = [
    //     {taskId:1 ,title:"一つ目のタスク"},
    //     {taskId:2 ,title:"二つ目のタスク"}
    // ];

    const [taskCards, setTaskCards] = useState([
        { taskId: 1, title: '一つ目のタスク', isNewCard: false },
        { taskId: 2, title: '二つ目のタスク', isNewCard: false },
    ]);

    const onClickAdd = useCallback(() => {
        //新しく配列を作成すると無駄だと思ってpushしていたらちょっとはまった、参考：https://navyferret.com/usestate-re-render-does-not-happen/
        const newTaskCards = [...taskCards, { taskId: 3, title: '新しいタスク', isNewCard: true }];
        setTaskCards(newTaskCards);
    }, []);

    const onClickDelete = useCallback(() => {
        const newTaskCards = taskCards.filter((e) => !e.isNewCard);
        setTaskCards(newTaskCards);
    }, []);
    //なんかusecallbackとusestateの使い方理解したほうがいいかも
    //全く別物
    //useCallBack→関数のmemo化、子のコンポーネントに関数を渡すときにその関数をmemo化することで子の再レンダリングを防ぐ
    //useState→Stateの管理、これが変更されたときにコンポーネントの再レンダリングを行う
    //memo→コンポーネントをmemo化する、propsを受け取るコンポーネントに対してそのpropsが変更された場合のみ再レンダリングするようにする、コンポーネント全部に付けたほうがいいかも
    const onClickTaskCard = useCallback(() => onOpen(), []);
    return (
        <>
            <Box>
                <HeaderLayout>
                    <TaskBox>
                        {taskCards.map((taskCard) => {
                            return (
                                <TaskCard
                                    key={taskCard.taskId}
                                    title={taskCard.title}
                                    onClick={onClickTaskCard}
                                    isNewCard={taskCard.isNewCard}
                                />
                            );
                        })}
                        {!taskCards[taskCards.length - 1].isNewCard ? (
                            <Box pl={10}>
                                <Button h="40%" p={1} pr={20} variant="ghost" onClick={onClickAdd}>
                                    + ADD a CARD
                                </Button>
                            </Box>
                        ) : (
                            <Flex pl={10} alignItems="center">
                                <Button h="40%" p={1} pr={20} variant="outline" onClick={onClickAdd} colorScheme="blue">
                                    + ADD CARD
                                </Button>

                                <IconButton
                                    variant="ghost"
                                    colorScheme="white"
                                    aria-label="Call Sage"
                                    fontSize="15px"
                                    icon={<AiOutlineClose />}
                                    onClick={onClickDelete}
                                />
                            </Flex>
                        )}
                    </TaskBox>
                </HeaderLayout>
            </Box>
            <TaskDetailModal isOpen={isOpen} onClose={onClose} />
        </>
    );
});
