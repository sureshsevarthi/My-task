import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaBars } from "react-icons/fa";

export default function AvailableColumns({ draggableId, items }) {
  return (
    <Droppable droppableId={draggableId} type="all">
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  className={`drag-object ${
                    snapshot.isDragging ? "is-dragging" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  <span>
                    <FaBars />
                  </span>{" "}
                  {item.name}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
