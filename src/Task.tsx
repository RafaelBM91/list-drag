import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface TaskModel {
    id: string;
    index: number;
    content: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius: 2px;
    border-left: 3px solid orange;
    padding: 8px;
    margin: 0 0 8px 0;
    background-color: ${(props: any) => (props.isDragging) ? 'lightgreen' : 'white'};
`;

const Handle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 2px;
    background-color: lightsalmon;
    margin: 0 0 0 0;
`;

const ViewPlus = styled.div`
    width: 5px;
    height: 5px;
    border: 2px solid gray;
    transform: rotate(45deg);
    border-top-color: transparent;
    border-left-color: transparent;
    cursor: pointer;
`;

const WrapperContent = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const Task: React.FunctionComponent<TaskModel> = ({
    id,
    index,
    content
}) => (
    <Draggable draggableId={id} index={index}>
    {
        (provided: any, snapshot: any) => (
            <Container
                {...provided.draggableProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                <Handle {...provided.dragHandleProps} />
                <WrapperContent>
                    {content}
                </WrapperContent>
                <ViewPlus />
            </Container>
        )
    }
    </Draggable>
);