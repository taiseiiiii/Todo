/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';
import { memo, useCallback, VFC } from 'react';
import { Task } from '../../../types/Task';

type Props = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    updateTaskCard: (task: Task) => void;
};

export const TaskDetailModal: VFC<Props> = memo((props) => {
    const { task, isOpen, onClose, updateTaskCard } = props;
    const [isEdit, setIsEdit] = useState(false);

    const summaryRef = useRef(null);
    const describeRef = useRef(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClickEdit = () => {
        isEdit ? setIsEdit(false) : setIsEdit(true);
    };

    const onClickSave = () => {
        if (summaryRef.current === null || describeRef.current === null) return;
        task.summary = summaryRef.current.value;
        task.detail = describeRef.current.value;
        isEdit && setIsEdit(false);
        if (task === null) return;
        updateTaskCard(task);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>
                    {!isEdit ? task?.summary : <Input placeholder={task?.summary} ref={summaryRef}></Input>}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <Stack spacing={4}>
                        <FormControl>
                            {!isEdit ? (
                                <Input value={task?.detail} isReadOnly ref={describeRef} />
                            ) : (
                                <Input placeholder={task?.detail} ref={describeRef} />
                            )}
                        </FormControl>
                        <Box pl={323}>
                            {!isEdit ? (
                                <Button h="40%" p={2} variant="ghost" onClick={onClickEdit}>
                                    Edit
                                </Button>
                            ) : (
                                <Button h="40%" p={2} variant="ghost" onClick={onClickSave}>
                                    Save
                                </Button>
                            )}
                        </Box>

                        {/* <FormControl>
                            <FormLabel>Detail</FormLabel>
                            <Input value="タスクの詳細です" isReadOnly />
                        </FormControl> */}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
