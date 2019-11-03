import React from 'react';
import logo from './logo.svg';
import './App.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [{
  Header: '',
  accessor: 'item_0'
}, {
  Header: '',
  accessor: 'item_1'
}, {
  Header: '',
  accessor: 'item_2'
}, {
  Header: '',
  accessor: 'item_3'
}, {
  Header: '',
  accessor: 'item_4'
}, {
  Header: '',
  accessor: 'item_5'
}, {
  Header: '',
  accessor: 'item_6'
}, {
  Header: '',
  accessor: 'item_7'
}, {
  Header: '',
  accessor: 'item_8'
}, {
  Header: '',
  accessor: 'item_9'
}, {
  Header: '',
  accessor: 'item_10'
}, {
  Header: '',
  accessor: 'item_11'
}]

const init = [
  { id: 'item-0', num: 0, content: 'A'},
  { id: 'item-1', num: 1, content: 'A#/Bb'},
  { id: 'item-2', num: 2, content: 'B'},
  { id: 'item-3', num: 3, content: 'C'},
  { id: 'item-4', num: 4, content: 'C#/Db'},
  { id: 'item-5', num: 5, content: 'D'},
  { id: 'item-6', num: 6, content: 'D#/Eb'},
  { id: 'item-7', num: 7, content: 'E'},
  { id: 'item-8', num: 8, content: 'F'},
  { id: 'item-9', num: 9, content: 'F#/Gb'},
  { id: 'item-10', num: 10, content: 'G'}, 
  { id: 'item-11', num: 11, content: 'G#/Ab'}
]

// const init = [
//   { id: 'item-0', content: 'A'},
//   { id: 'item-1', content: 'A#/Bb'},
//   { id: 'item-2', content: 'B'},
//   { id: 'item-3', content: 'C'},
//   { id: 'item-4', content: 'C#/Db'},
//   { id: 'item-5', content: 'D'},
//   { id: 'item-6', content: 'D#/Eb'},
//   { id: 'item-7', content: 'E'},
//   { id: 'item-8', content: 'F'},
//   { id: 'item-9', content: 'F#/Gb'},
//   { id: 'item-10', content: 'G'}, 
//   { id: 'item-11', content: 'G#/Ab'}
// ]


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 4,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'gray' : 'gray',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      // items: getItems(8),
      items: init,
      matrix_num: [],
      inversion: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.generateMatrix();
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  generateMatrix() {
    const snapshot = this.state.items;
    // Set first note to 0
    const offset = snapshot[0].num;
    snapshot.forEach(element => {
      element.num = element.num - offset;
      if (element.num < 0) {
        element.num = element.num + 12;
      }
    });
    // get inversion 0, an array of numbers
    var inverse = [];
    snapshot.forEach(element => {
      var result = 0;
      if (element.num === 0 || element.num === 6) {
        result = element.num;
      }
      else {
        if (element.num > 6 ) {
          var pivot = element.num - 6;
          result = 6 - pivot;
        }
        else {
          var pivot = 6 - element.num;
          result = 6 + pivot;
        }
      }
      inverse.push(result);
    });
    // get matrix numbers
    const row0 = {
      item_0: snapshot[0].num,
      item_1: snapshot[1].num,
      item_2: snapshot[2].num,
      item_3: snapshot[3].num,
      item_4: snapshot[4].num,
      item_5: snapshot[5].num,
      item_6: snapshot[6].num,
      item_7: snapshot[7].num,
      item_8: snapshot[8].num,
      item_9: snapshot[9].num,
      item_10: snapshot[10].num,
      item_11: snapshot[11].num
    };
    var matrix = [];
    inverse.forEach(element => {
      var row = JSON.parse(JSON.stringify(row0));
      row.item_0 = row.item_0 + element;
      row.item_1 = row.item_1 + element;
      row.item_2 = row.item_2 + element;
      row.item_3 = row.item_3 + element;
      row.item_4 = row.item_4 + element;
      row.item_5 = row.item_5 + element;
      row.item_6 = row.item_6 + element;
      row.item_7 = row.item_7 + element;
      row.item_8 = row.item_8 + element;
      row.item_9 = row.item_9 + element;
      row.item_10 = row.item_10 + element;
      row.item_11 = row.item_11 + element;

      row.item_0 = row.item_0 > 11 ? row.item_0 - 12 : row.item_0;
      row.item_1 = row.item_1 > 11 ? row.item_1 - 12 : row.item_1;
      row.item_2 = row.item_2 > 11 ? row.item_2 - 12 : row.item_2;
      row.item_3 = row.item_3 > 11 ? row.item_3 - 12 : row.item_3;
      row.item_4 = row.item_4 > 11 ? row.item_4 - 12 : row.item_4;
      row.item_5 = row.item_5 > 11 ? row.item_5 - 12 : row.item_5;
      row.item_6 = row.item_6 > 11 ? row.item_6 - 12 : row.item_6;
      row.item_7 = row.item_7 > 11 ? row.item_7 - 12 : row.item_7;
      row.item_8 = row.item_8 > 11 ? row.item_8 - 12 : row.item_8;
      row.item_9 = row.item_9 > 11 ? row.item_9 - 12 : row.item_9;
      row.item_10 = row.item_10 > 11 ? row.item_10 - 12 : row.item_10;
      row.item_11 = row.item_11 > 11 ? row.item_11 - 12 : row.item_11;
      matrix.push(row);
    });
    this.setState({ inversion: inverse, matrix_num: matrix });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={()=> this.generateMatrix()}
        >Generate Matrix</Button>
        <ReactTable
          data={this.state.matrix_num}
          columns={columns}
          minRows={12}
          showPagination={false}
        />
      </React.Fragment>
    );
  }
}

export default App;
