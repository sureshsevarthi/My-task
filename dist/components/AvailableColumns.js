"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AvailableColumns;

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AvailableColumns(_ref) {
  var draggableId = _ref.draggableId,
      items = _ref.items;
  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
    droppableId: draggableId,
    type: "all"
  }, function (provided) {
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, provided.droppableProps, {
      ref: provided.innerRef
    }), items.map(function (item, index) {
      return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
        key: item.id,
        draggableId: item.id,
        index: index
      }, function (provided, snapshot) {
        return /*#__PURE__*/_react.default.createElement("div", _extends({
          className: "drag-object ".concat(snapshot.isDragging ? "is-dragging" : ""),
          ref: provided.innerRef
        }, provided.draggableProps, provided.dragHandleProps, {
          style: provided.draggableProps.style
        }), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_fa.FaBars, null)), " ", item.name);
      });
    }), provided.placeholder);
  });
}