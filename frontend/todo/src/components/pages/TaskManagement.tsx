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
import { Task } from '../../types/Task';

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
        { taskId: 1, summary: '一つ目のタスク', detail: '', isNewCard: false, affiliation: 'ToDo' },
        { taskId: 2, summary: '二つ目のタスク', detail: '', isNewCard: false, affiliation: 'ToDo' },
    ]);

    const [inProgress, setInProgress] = useState<Task[]>([
        // { taskId: 1, summary: '一つ目のタスク', detail: '', isNewCard: false, affiliation: '着手中' },
    ]);

    const [doneCards, setDoneCards] = useState<Task[]>([
        // { taskId: 1, summary: '一つ目のタスク', detail: '', isNewCard: false, affiliation: '完了' },
    ]);

    const taskCategory: { [name: string]: Task[] } = {};
    taskCategory['ToDo'] = taskCards;
    taskCategory['着手中'] = inProgress;
    taskCategory['完了'] = doneCards;

    const columns: string[] = ['ToDo', '着手中', '完了'];

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const onClickAdd = (affiliation: string) => {
        //新しく配列を作成すると無駄だと思ってpushしていたらちょっとはまった、参考：https://navyferret.com/usestate-re-render-does-not-happen/
        //TODO:分類は定数化したい
        const targetArray = taskCategory[affiliation];
        const newTaskCards = [
            ...targetArray,
            { taskId: targetArray.length + 1, summary: '', detail: '', isNewCard: true, affiliation: affiliation },
        ];

        updateState(affiliation, newTaskCards);
    };

    const onClickDelete = (affiliation: string) => {
        const targetArray = taskCategory[affiliation];
        const newTaskCards = targetArray.filter((target) => !target.isNewCard);
        updateState(affiliation, newTaskCards);
        setValue('');
    };

    const onClickAddNew = (affiliation: string) => {
        const summary = value;
        const targetArray = taskCategory[affiliation];
        targetArray.pop();
        const newTaskCards = [
            ...targetArray,
            {
                taskId: targetArray.length + 1,
                summary: summary,
                detail: '',
                isNewCard: false,
                affiliation: affiliation,
            },
        ];
        updateState(affiliation, newTaskCards);
        setValue('');
    };
    //なんかusecallbackとusestateの使い方理解したほうがいいかも
    //全く別物
    //useCallBack→関数のmemo化、子のコンポーネントに関数を渡すときにその関数をmemo化することで子の再レンダリングを防ぐ
    //useState→Stateの管理、これが変更されたときにコンポーネントの再レンダリングを行う
    //memo→コンポーネントをmemo化する、propsを受け取るコンポーネントに対してそのpropsが変更された場合のみ再レンダリングするようにする、コンポーネント全部に付けたほうがいいかも
    const onClickTaskCard = (id: number, affiliation: string) => {
        const taskCards = taskCategory[affiliation];
        //↓なんか知らんけどtaskCategory[affiliation];直接引数に渡したらダメだった
        onSelectedTask({ id, taskCards, onOpen });
    };

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // destination: ドロップ先 がない場合には処理を終了
        if (!destination) {
            return;
        }

        //移動先のカラムID
        const afterColId = destination.droppableId;
        //移動元のカラムID
        const beforeColId = source.droppableId;
        //移動元のindex
        const beforeIndex = source.index;
        //移動先のindex
        const afterIndex = destination.index;

        // ドロップ前後のIDが同じで、ドロップ前後のindexが同じ場合には処理を終了
        if (afterColId === beforeColId && afterIndex === beforeIndex) {
            return;
        }

        //ドラッグ開始時の列と終了時の列を比較、同じ列内の場合と違う列内の場合の処理を分ける
        //開始列と終了列が同じ場合
        if (beforeColId === afterColId) {
            //現在のタスクカード一覧を取得する
            const nowTaskCards = [...taskCards];
            //ドロップした要素を保持する
            const droppedElement = nowTaskCards[beforeIndex];
            //taskCardsからドラッグした要素を削除する
            nowTaskCards.splice(beforeIndex, 1);
            //taskCardsに対してドラッグした要素をドラッグした位置に挿入する
            nowTaskCards.splice(afterIndex, 0, droppedElement);

            setTaskCards(nowTaskCards);
            return;
        }

        //開始列と終了列が違う場合
        //移動元のリストを組みなおす(移動した要素を削除する)
        const beforeArray = taskCategory[beforeColId];

        //移動元の要素は保持しておく
        const targetElement = beforeArray[beforeIndex];
        beforeArray.splice(beforeIndex, 1);
        updateState(beforeColId, beforeArray);
        //終了列のリストを組みなおす(移動した要素を移動したインデックスに追加する)
        const afterArray = taskCategory[afterColId];
        //IDは新しく追加したものなので振りなおす
        targetElement.affiliation = afterColId;
        // targetElement.taskId = afterArray.length + 1;
        afterArray.splice(afterIndex, 0, targetElement);
        updateState(afterColId, afterArray);
    };

    const updateState = (affiliation: string, targetArray: Task[]) => {
        affiliation === 'ToDo' && setTaskCards(targetArray);
        affiliation === '着手中' && setInProgress(targetArray);
        affiliation === '完了' && setDoneCards(targetArray);
    };

    return (
        <>
            <Box>
                <HeaderLayout>
                    <Flex alignItems="flex-start">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {columns.map((title, index) => {
                                const taskArray = taskCategory[title];
                                return (
                                    <Box key={index} mt={30}>
                                        <TaskBox title={title}>
                                            <Droppable droppableId={title}>
                                                {(provided) => (
                                                    <ul
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{ listStyle: 'none' }}
                                                    >
                                                        {taskArray.map((taskCard, index) => {
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
                                                                                onClick={() =>
                                                                                    onClickTaskCard(
                                                                                        taskCard.taskId,
                                                                                        title
                                                                                    )
                                                                                }
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
                                                    </ul>
                                                )}
                                            </Droppable>
                                            {taskArray.length ? (
                                                !taskArray[taskArray.length - 1].isNewCard ? (
                                                    <Box pl={10}>
                                                        <Button
                                                            h="40%"
                                                            p={1}
                                                            pr={20}
                                                            variant="ghost"
                                                            onClick={() => onClickAdd(title)}
                                                        >
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
                                                            onClick={() => onClickAddNew(title)}
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
                                                            onClick={() => onClickDelete(title)}
                                                        />
                                                    </Flex>
                                                )
                                            ) : (
                                                <Box pl={10}>
                                                    <Button
                                                        h="40%"
                                                        p={1}
                                                        pr={20}
                                                        variant="ghost"
                                                        onClick={() => onClickAdd(title)}
                                                    >
                                                        + ADD a CARD
                                                    </Button>
                                                </Box>
                                            )}
                                        </TaskBox>
                                    </Box>
                                );
                            })}
                        </DragDropContext>
                    </Flex>
                </HeaderLayout>
            </Box>
            <TaskDetailModal isOpen={isOpen} onClose={onClose} task={selectedTask} />
        </>
    );
});
