import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AvailableColumns from "./AvailableColumns";
import VisibleColumns from "./VisibleColumns";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

export const COLUMN_TYPE = {
  available: "AVAILABLE",
  visible: "VISIBLE"
};

const filterAvailableColumns = (columns = [], visibleColumns = []) => {
  return columns.filter(column => visibleColumns.indexOf(column.id) === -1);
};

export default function ColumnSetup({
  availableColumns,
  visibleColumns,
  fixedIndex,
  onSave,
  onClose
}) {
  const [currentAvailableColumns, setCurrentAvailableColumns] = useState(
    filterAvailableColumns(availableColumns, visibleColumns) || []
  );
  const [currentVisibleColumns, setCurrentVisibleColumns] = useState(
    visibleColumns
  );
  const [indexOfFixedRow, setIndexOfFixedRow] = useState(fixedIndex || -1);

  const handleClose = () => {
    onClose && onClose();
  };

  // on drag end using react-beautiful-dnd
  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      switch (source.droppableId) {
        case COLUMN_TYPE.available:
          setCurrentAvailableColumns(
            reorder(currentAvailableColumns, source.index, destination.index)
          );
          break;
        case COLUMN_TYPE.visible:
          if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
            setCurrentVisibleColumns(
              reorder(currentVisibleColumns, source.index, destination.index)
            );
          }
          break;
        default:
      }
    } else {
      if (
        source.droppableId === COLUMN_TYPE.available &&
        destination.droppableId === COLUMN_TYPE.visible
      ) {
        if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
          replaceFromAvailableToVisible(source.index, destination.index);
        }
      } else if (
        source.droppableId === COLUMN_TYPE.visible &&
        destination.droppableId === COLUMN_TYPE.available
      ) {
        replaceFromVisibleToAvailable(source.index, destination.index);
      }
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const replaceFromAvailableToVisible = (
    fromAvailableIndex,
    toVisibleIndex
  ) => {
    const availableList = Array.from(currentAvailableColumns);
    const [removed] = availableList.splice(fromAvailableIndex, 1);
    setCurrentAvailableColumns(availableList);
    if (removed) {
      const visibleList = Array.from(currentVisibleColumns);
      visibleList.splice(toVisibleIndex, 0, removed.id);
      setCurrentVisibleColumns(visibleList);
    }
  };

  const replaceFromVisibleToAvailable = (
    fromVisibleIndex,
    toAvailableIndex
  ) => {
    const visibleList = Array.from(currentVisibleColumns);
    const [removedId] = visibleList.splice(fromVisibleIndex, 1);
    setCurrentVisibleColumns(visibleList);
    const removedObject =
      removedId &&
      availableColumns &&
      availableColumns.filter(column => column.id === removedId);
    if (removedObject && removedObject[0]) {
      const availableList = Array.from(currentAvailableColumns);
      availableList.splice(toAvailableIndex, 0, removedObject[0]);
      setCurrentAvailableColumns(availableList);
    }
  };

  const setFixedIndex = (index = null) => {
    setIndexOfFixedRow(index);
  };

  const isNotFixedAreaCheck = (targetIndex, fixedIndex) => {
    return targetIndex > fixedIndex;
  };

  const handleSave = () => {
    const numberOfFixedColumns = currentVisibleColumns.filter(
      (column, index) => !isNotFixedAreaCheck(index, indexOfFixedRow)
    ).length;
    const visibleColumnsData = currentVisibleColumns.filter((column, index) =>
      isNotFixedAreaCheck(index, indexOfFixedRow)
    );
    const data = {
      visibleColumnsData,
      numberOfFixedColumns
    };
    onSave && onSave(data);
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      className="column-setup-modal"
      backdrop={"static"}
    >
      <div className="root">
        <Modal.Header closeButton>
          <Container>
            <Row>
              <Col xs={12}>
                <h4>Configure Data Fields</h4>
                <p className="m-0">
                  Drag & drop between columns to configure visible data.
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <DragDropContext onDragEnd={onDragEnd}>
              <Row>
                <Col xs={6} className="drag-list left-column">
                  <span>Available</span>
                  <AvailableColumns
                    items={currentAvailableColumns}
                    draggableId={COLUMN_TYPE.available}
                  />
                </Col>
                <Col xs={6} className="drag-list right-column">
                  <span>Visible</span>
                  <VisibleColumns
                    allItems={availableColumns}
                    visibleItemsIds={currentVisibleColumns}
                    draggableId={COLUMN_TYPE.visible}
                    fixedIndex={indexOfFixedRow}
                    onGetFixedIndex={setFixedIndex}
                  />
                </Col>
              </Row>
            </DragDropContext>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
