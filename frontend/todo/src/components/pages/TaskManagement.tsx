/* eslint-disable react/no-string-refs */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { memo, useCallback, VFC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskBox } from '../organisms/Task/TaskBox';
import { HeaderLayout } from '../templates/HeaderLayout';
import { Box, Button, Flex, IconButton, Spacer, Textarea, useDisclosure } from '@chakra-ui/react';
import { TaskCard } from '../organisms/Task/TaskCard';
import { TaskDetailModal } from '../organisms/Task/TaskDetailModal';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelectTasks } from '../../hooks/useSelectTasks';

export const TaskManagement: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = React.useState('');
    const { onSelectedTask, selectedTask } = useSelectTasks();
    //本来java側から送られてくる値TODOこの配列自体の型の指定どうしようか
    //初期表示時に値を取ってくる処理に関してはuseEffectを使う→都度調べて
    // const taskCards = [
    //     {taskId:1 ,title:"一つ目のタスク"},
    //     {taskId:2 ,title:"二つ目のタスク"}
    // ];

    const [taskCards, setTaskCards] = useState([
        { taskId: 1, summary: '一つ目のタスク', detail: '', isNewCard: false },
        { taskId: 2, summary: '二つ目のタスク', detail: '', isNewCard: false },
    ]);

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const onClickAdd = () => {
        //新しく配列を作成すると無駄だと思ってpushしていたらちょっとはまった、参考：https://navyferret.com/usestate-re-render-does-not-happen/
        const newTaskCards = [...taskCards, { taskId: taskCards.length + 1, summary: '', detail: '', isNewCard: true }];
        setTaskCards(newTaskCards);
    };

    const onClickDelete = () => {
        const newTaskCards = taskCards.filter((target) => !target.isNewCard);
        setTaskCards(newTaskCards);
        setValue('');
    };

    const onClickAddNew = () => {
        const summary = value;
        taskCards.pop();
        const newTaskCards = [
            ...taskCards,
            { taskId: taskCards.length + 1, summary: summary, detail: '', isNewCard: false },
        ];
        setTaskCards(newTaskCards);
        setValue('');
    };
    //なんかusecallbackとusestateの使い方理解したほうがいいかも
    //全く別物
    //useCallBack→関数のmemo化、子のコンポーネントに関数を渡すときにその関数をmemo化することで子の再レンダリングを防ぐ
    //useState→Stateの管理、これが変更されたときにコンポーネントの再レンダリングを行う
    //memo→コンポーネントをmemo化する、propsを受け取るコンポーネントに対してそのpropsが変更された場合のみ再レンダリングするようにする、コンポーネント全部に付けたほうがいいかも
    const onClickTaskCard = (id: number) => {
        onSelectedTask({ id, taskCards, onOpen });
    };

    const onDragEnd = (result: any) => {
        const { draggableId, source, destination } = result;
        // destination: ドロップ先 がない場合には処理を終了
        if (!destination) {
            return;
        }

        // ドロップ前後のIDが同じで、ドロップ前後のindexが同じ場合には処理を終了
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        //現在のタスクカード一覧を取得する
        const nowTaskCards = [...taskCards];
        //taskCardsからドラッグした要素を削除する
        nowTaskCards.splice(source.index, 1);
        //taskCardsに対してドラッグした要素をドラッグした位置に挿入する
        nowTaskCards.splice(destination.index, 0, draggableId);

        //stateを更新する→並び順が保持されるはず
        //TODO:並び順は保持されたけど値が消えている→デバッグして値が消えないように作り直すしかない
        setTaskCards(nowTaskCards);
    };

    return (
        <>
            <Box>
                <HeaderLayout>
                    <Flex alignItems="flex-start">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="TODO">
                                {(provided) => (
                                    <TaskBox>
                                        <ul
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{ listStyle: 'none' }}
                                        >
                                            {taskCards.map((taskCard, index) => {
                                                return (
                                                    <Draggable
                                                        key={taskCard.taskId}
                                                        draggableId={`${taskCard.taskId}`}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <li
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TaskCard
                                                                    id={taskCard.taskId}
                                                                    key={taskCard.taskId}
                                                                    onClick={() => onClickTaskCard(taskCard.taskId)}
                                                                    isNewCard={taskCard.isNewCard}
                                                                    content={
                                                                        !taskCard.isNewCard ? (
                                                                            <span>{taskCard.summary}</span>
                                                                        ) : (
                                                                            <Textarea
                                                                                minH="43.5"
                                                                                W="252"
                                                                                p={0}
                                                                                resize="none"
                                                                                overflow="hidden"
                                                                                variant="unstyled"
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        )
                                                                    }
                                                                />
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                            {!taskCards[taskCards.length - 1].isNewCard ? (
                                                <Box pl={10}>
                                                    <Button h="40%" p={1} pr={20} variant="ghost" onClick={onClickAdd}>
                                                        + ADD a CARD
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Flex pl={10} alignItems="center">
                                                    <Button
                                                        h="40%"
                                                        p={1}
                                                        pr={20}
                                                        variant="outline"
                                                        colorScheme="blue"
                                                        onClick={onClickAddNew}
                                                        disabled={!value ? true : undefined}
                                                    >
                                                        + ADD
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
                                        </ul>
                                    </TaskBox>
                                )}
                            </Droppable>
                            {/* <Droppable droppableId="Complete">
                                {(provided) => (
                                    <Box ml={20}>
                                        <TaskBox></TaskBox>
                                    </Box>
                                )}
                            </Droppable> */}
                        </DragDropContext>
                    </Flex>
                </HeaderLayout>
            </Box>
            <TaskDetailModal isOpen={isOpen} onClose={onClose} task={selectedTask} />
        </>
    );
});
