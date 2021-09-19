/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {
    Box,
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

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>{task?.summary}</ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input value="タスクの説明です" isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Detail</FormLabel>
                            <Input value="タスクの詳細です" isReadOnly />
                        </FormControl>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
