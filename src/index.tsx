import * as React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './Comlumn';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        background-image: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
    }
`;

interface DataModel {
    todo: string[];
    inProgress: string[];
}

interface PositionModel {
    droppableId: 'todo' | 'inProgress';
    index: number;
}

interface EventDrag {
    destination: PositionModel;
    source: PositionModel;
}

const dataBase: DataModel = {
    todo: ['uno','dos','tres','cuatro','cinco','seis'],
    inProgress: []
};

const Container = styled.div`
    display: flex;
`;

const App = () => {
    const [state, setState] = React.useState<DataModel>(dataBase);

    const onDragEnd = (result: EventDrag) => {
        let { destination, source } = result;
        if (destination && source) {
            let virtualState = state;
            let register = '{}';
            let virtualStateDestination = virtualState[destination.droppableId];
            let virtualStateSource = virtualState[source.droppableId];
            try {
                if (destination.droppableId === source.droppableId) {
                    let item = virtualStateSource[source.index];
                    virtualStateSource.splice(source.index, 1);
                    virtualStateDestination.splice(destination.index, 0, item);
                    register = `{"${destination.droppableId}": ${JSON.stringify(virtualStateDestination)}}`;
                } else {
                    virtualStateDestination.splice(destination.index, 0, virtualStateSource[source.index]);
                    virtualStateSource.splice(source.index, 1);
                    register = `{
                        "${destination.droppableId}": ${JSON.stringify(virtualStateDestination)},
                        "${source.droppableId}": ${JSON.stringify(virtualStateSource)}
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
            onDragEnd={onDragEnd}
            onDragStart={() => null}
            onDragUpate={() => null}
        >
            <Container>
                <Column title={'Todo'} task={state.todo} id={'todo'} />
                <Column title={'In Progress'} task={state.inProgress} id={'inProgress'} />
            </Container>
        </DragDropContext>
    );
};

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>, document.getElementById('root'));
