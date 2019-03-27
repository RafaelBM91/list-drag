import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './Comlumn';
import styled from 'styled-components';

interface DataModel {
    todo: string[];
    inProgress: string[];
    done: string[];
}

interface PositionModel {
    droppableId: 'todo' | 'inProgress' | 'done';
    index: number;
}

const dataBase: DataModel = {
    todo: ['uno','dos','tres','cuatro','cinco','seis'],
    inProgress: [],
    done: []
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const App = () => {
    const [state, setState] = React.useState<DataModel>(dataBase);

    const onDragEnd = (result: DropResult) => {
        let { destination, source } = result;
        if (destination && source) {
            let nDestination = destination as PositionModel;
            let nSource = source as PositionModel;
            let virtualState = state;
            let register = '{}';
            let virtualStateDestination = virtualState[nDestination.droppableId];
            let virtualStateSource = virtualState[nSource.droppableId];
            try {
                if (nDestination.droppableId === nSource.droppableId) {
                    let item = virtualStateSource[nSource.index];
                    virtualStateSource.splice(nSource.index, 1);
                    virtualStateDestination.splice(nDestination.index, 0, item);
                    register = `{"${nDestination.droppableId}": ${JSON.stringify(virtualStateDestination)}}`;
                } else {
                    virtualStateDestination.splice(nDestination.index, 0, virtualStateSource[nSource.index]);
                    virtualStateSource.splice(nSource.index, 1);
                    register = `{
                        "${nDestination.droppableId}": ${JSON.stringify(virtualStateDestination)},
                        "${nSource.droppableId}": ${JSON.stringify(virtualStateSource)}
                    }`;
                }
            } catch (e) {
                console.error(e);
            }
            setState({ ...state, ...JSON.parse(register) });
        }
    };

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result)}
        >
            <Container>
                <Column title={'Todo'} task={state.todo} id={'todo'} />
                <Column title={'In Progress'} task={state.inProgress} id={'inProgress'} />
                <Column title={'Done'} task={state.done} id={'done'} />
            </Container>
        </DragDropContext>
    );
};
