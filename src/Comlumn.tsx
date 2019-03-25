import * as React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';

interface ColummModel {
    title: string;
    task: string[];
    id: string;
}

const Container = styled.div`
    width: 400px;
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
`;

const Title = styled.h3`
    padding: 8px;
    margin: 0;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props: any) => (props.isDraggingOver) ? 'skyblue' : 'tranparent'};
    min-height: calc(100% - 54px);
`;

export const Column: React.FunctionComponent<ColummModel> = ({
    title,
    task,
    id
}) => (
    <Container>
        <Title>{title}</Title>
        <Droppable droppableId={id}>
        {
            (provided: any, snapshot: any) => (
                <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                {
                    task.map((content, index) =>
                        <Task key={index} content={content} index={index} id={(id + index + '_hola')} />
                    )
                }
                    {provided.placeholder}
                </TaskList>
            )
        }
        </Droppable>
    </Container>
);
