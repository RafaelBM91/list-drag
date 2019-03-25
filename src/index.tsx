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

const data_base = {
    todo: ['uno','dos','tres','cuatro','cinco','seis'],
    inProgress: []
};

const Container = styled.div`
    display: flex;
`;

const App = () => {
    const [state, setState] = React.useState(data_base);

    const onDragEnd = (result: any) => {
        let { destination, source } = result;
        if (destination && source) {
            let virtual_state: any = state;
            let register = `{}`;
            let virtual_state_destination = virtual_state[destination.droppableId];
            let virtual_state_source = virtual_state[source.droppableId];
            try {
                if (destination.droppableId === source.droppableId) {
                    let item = virtual_state_source[source.index];
                    virtual_state_source.splice(source.index, 1);
                    console.log(virtual_state_source);
                    virtual_state_destination.splice(destination.index, 0, item);
                    console.log(virtual_state_destination);
                    register = `{
                        "${destination.droppableId}": ${JSON.stringify(virtual_state_destination)},
                    }`;
                } else {
                    virtual_state_destination.splice(destination.index, 0, virtual_state_source[source.index]);
                    virtual_state_source.splice(source.index, 1);
                    register = `{
                        "${destination.droppableId}": ${JSON.stringify(virtual_state_destination)},
                        "${source.droppableId}": ${JSON.stringify(virtual_state_source)}
                    }`;
                }
            } catch (e) {
                console.error(e);
            }
            if (state !== JSON.parse(register))
                setState({ ...JSON.parse(register) });
        }
    }

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
}

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>, document.getElementById('root'));
