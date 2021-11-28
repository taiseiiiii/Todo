/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
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
};

export const TaskDetailModal: VFC<Props> = memo((props) => {
    const { task, isOpen, onClose } = props;
    const [isEdit, setIsEdit] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClickEdit = () => {
        isEdit ? setIsEdit(false) : setIsEdit(true);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>{task?.summary}</ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <Stack spacing={4}>
                        <FormControl>
                            {!isEdit ? (
                                <Input placeholder="タスクの説明です" isReadOnly />
                            ) : (
                                <Input placeholder="タスクの説明です" />
                            )}
                        </FormControl>
                        <Box pl={323}>
                            {!isEdit ? (
                                <Button h="40%" p={2} variant="ghost" onClick={onClickEdit}>
                                    Edit
                                </Button>
                            ) : (
                                <Button h="40%" p={2} variant="ghost" onClick={onClickEdit}>
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
