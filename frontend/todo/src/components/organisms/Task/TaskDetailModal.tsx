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

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TaskDetailModal: VFC<Props> = memo((props) => {
    const { isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>タスクのタイトルが入る</ModalHeader>
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
