import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [{
  Header: 'Number Matrix',
  width: 480,
  columns: [{
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_0',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_1',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_2',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_3',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_4',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_5',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_6',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_7',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_8',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_9',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_10',
    width: 40
  }, {
    Header: '',
    style: { textAlign: "center" },
    accessor: 'item_11',
    width: 40
  }],
}]
// columns = [{
//   Header: '',
//   accessor: 'item_0',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_1',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_2',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_3',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_4',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_5',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_6',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_7',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_8',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_9',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_10',
//   width: 40
// }, {
//   Header: '',
//   accessor: 'item_11',
//   width: 40
// }]

// const init = [
//   { id: 'item-0', num: 0, content: 'A'},
//   { id: 'item-1', num: 1, content: 'A#/Bb'},
//   { id: 'item-2', num: 2, content: 'B'},
//   { id: 'item-3', num: 3, content: 'C'},
//   { id: 'item-4', num: 4, content: 'C#/Db'},
//   { id: 'item-5', num: 5, content: 'D'},
//   { id: 'item-6', num: 6, content: 'D#/Eb'},
//   { id: 'item-7', num: 7, content: 'E'},
//   { id: 'item-8', num: 8, content: 'F'},
//   { id: 'item-9', num: 9, content: 'F#/Gb'},
//   { id: 'item-10', num: 10, content: 'G'},
//   { id: 'item-11', num: 11, content: 'G#/Ab'}
// ]

const init = [
  { id: 'item-0', num: 0, content: 'A'},
  { id: 'item-1', num: 1, content: 'A#'},
  { id: 'item-2', num: 2, content: 'B'},
  { id: 'item-3', num: 3, content: 'C'},
  { id: 'item-4', num: 4, content: 'C#'},
  { id: 'item-5', num: 5, content: 'D'},
  { id: 'item-6', num: 6, content: 'D#'},
  { id: 'item-7', num: 7, content: 'E'},
  { id: 'item-8', num: 8, content: 'F'},
  { id: 'item-9', num: 9, content: 'F#'},
  { id: 'item-10', num: 10, content: 'G'},
  { id: 'item-11', num: 11, content: 'G#'}
]


// RBDND a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 6;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `20px 44px 20px 44px`,
  margin: `0 ${grid/2}px 0 ${grid/2}px`,
  width: '100px',

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

      aSharp: true,
      cSharp: true,
      dSharp: true,
      fSharp: true,
      gSharp: true,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.generateMatrix();
  }

  // RBDND
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

  // A bunch of methods to change the sharps to their flats
  clickaSharp() {
    var sharp = this.state.aSharp;
    if (sharp) {
      var oldvalue = 'A#';
      var newvalue = 'Bb';
    } else {
      oldvalue = 'Bb';
      newvalue = 'A#'
    }
    this.setState({ aSharp: !sharp });
    this.replaceByValue('content', oldvalue, newvalue );
  }
  clickcSharp() {
    var sharp = this.state.cSharp;
    if (sharp) {
      var oldvalue = 'C#';
      var newvalue = 'Db';
    } else {
      oldvalue = 'Db';
      newvalue = 'C#'
    }
    this.setState({ cSharp: !sharp });
    this.replaceByValue('content', oldvalue, newvalue );
  }
  clickdSharp() {
    var sharp = this.state.dSharp;
    if (sharp) {
      var oldvalue = 'D#';
      var newvalue = 'Eb';
    } else {
      oldvalue = 'Eb';
      newvalue = 'D#'
    }
    this.setState({ dSharp: !sharp });
    this.replaceByValue('content', oldvalue, newvalue );
  }
  clickfSharp() {
    var sharp = this.state.fSharp;
    if (sharp) {
      var oldvalue = 'F#';
      var newvalue = 'Gb';
    } else {
      oldvalue = 'Gb';
      newvalue = 'F#'
    }
    this.setState({ fSharp: !sharp });
    this.replaceByValue('content', oldvalue, newvalue );
  }
  clickgSharp() {
    var sharp = this.state.gSharp;
    if (sharp) {
      var oldvalue = 'G#';
      var newvalue = 'Ab';
    } else {
      oldvalue = 'Ab';
      newvalue = 'G#'
    }
    this.setState({ gSharp: !sharp });
    this.replaceByValue('content', oldvalue, newvalue );
  }

  // A function to replace a specific key's value
  replaceByValue( field, oldvalue, newvalue ) {
    var temp = JSON.parse(JSON.stringify(this.state.items));
    for( var k = 0; k < temp.length; ++k ) {
        if( oldvalue === temp[k][field] ) {
            temp[k][field] = newvalue ;
        }
    }
    this.setState({ items: temp });
  }

  // generates the matrix in number form
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
          pivot = 6 - element.num;
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
    // i dont actually need to keep the inversion
    this.setState({ inversion: inverse, matrix_num: matrix });
  }

  // render components
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <Button
                variant={this.state.aSharp ? "primary" : "success"}
                size="lg"
                onClick={()=> this.clickaSharp()}
              >
                {this.state.aSharp ? 'A#' : 'Bb'}
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.cSharp ? "primary" : "success"}
                size="lg"
                onClick={()=> this.clickcSharp()}
              >
                {this.state.cSharp ? 'C#' : 'Db'}
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.dSharp ? "primary" : "success"}
                size="lg"
                onClick={()=> this.clickdSharp()}
              >
                {this.state.dSharp ? 'D#' : 'Eb'}
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.fSharp ? "primary" : "success"}
                size="lg"
                onClick={()=> this.clickfSharp()}
              >
                {this.state.fSharp ? 'F#' : 'Gb'}
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.gSharp ? "primary" : "success"}
                size="lg"
                onClick={()=> this.clickgSharp()}
              >
                {this.state.gSharp ? 'G#' : 'Ab'}
              </Button>
            </Col>
            <Col></Col>

          </Row>
        </Container>

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
        <Container>
          {/* <Row>
            <Col xs={12}>
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
            </Col>
          </Row> */}
          <Row>
            <Col xs={12} md={2}></Col>
            <Col xs={12} md={8}>
              <Button
                variant="primary"
                size="lg"
                block
                onClick={()=> this.generateMatrix()}
              >
                Generate Matrix
              </Button>
            </Col>
            <Col xs={12} md={2}></Col>
          </Row>
          <Row>
            <ReactTable
              data={this.state.matrix_num}
              columns={columns}
              minRows={12}
              showPagination={false}
            />
            <Col xs="auto">
              <ReactTable
                data={this.state.matrix_num}
                columns={columns}
                minRows={12}
                showPagination={false}
                resizable={true}
              />
            </Col>
          </Row>
        </Container>

      </React.Fragment>
    );
  }
}

export default App;
