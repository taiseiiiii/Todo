import React from "react";
import { memo, useCallback, VFC } from "react";
import { TaskBox } from "../organisms/Task/TaskBox";
import { HeaderLayout } from "../templates/HeaderLayout";
import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { TaskCard } from "../organisms/Task/TaskCard";
import { TaskDetailModal } from "../organisms/Task/TaskDetailModal";
import { useState } from "react";

export const TaskManagement: VFC = memo(() => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    //本来java側から送られてくる値TODOこの配列自体の型の指定どうしようか
    // const taskCards = [
    //     {taskId:1 ,title:"一つ目のタスク"},
    //     {taskId:2 ,title:"二つ目のタスク"}
    // ];

    const [taskCards, setTaskCards] = useState([
        {taskId:1, title:"一つ目のタスク",isNewCard:false},
        {taskId:2, title:"二つ目のタスク", isNewCard:false}
    ]);

    const onClickAdd = () => {
        //新しく配列を作成すると無駄だと思ってpushしていたらちょっとはまった、参考：https://navyferret.com/usestate-re-render-does-not-happen/
        const newTaskCards = [...taskCards,{taskId:3, title:"新しいタスク", isNewCard:true}]
        setTaskCards(newTaskCards);
    }

    //なんかusecallbackとusestateの使い方理解したほうがいいかも
    const onClickTaskCard = useCallback(() => onOpen(),[]);
    return (
        <>
            <Box>
                <HeaderLayout>
                <TaskBox>
                    {taskCards.map((taskCard) => {
                        return <TaskCard key={taskCard.taskId} title={taskCard.title} onClick={onClickTaskCard} isNewCard={taskCard.isNewCard}/>
                    })}
                    <Box pl={10}>
                        <Button h="40%" p={1} pr={20} variant="ghost" onClick={onClickAdd}>+ ADD a CARD</Button>
                    </Box>
                </TaskBox> 
                </HeaderLayout>
            </Box>
            <TaskDetailModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
});