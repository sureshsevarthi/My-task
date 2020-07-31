"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VisibleColumns;

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function VisibleColumns(_ref) {
  var draggableId = _ref.draggableId,
      visibleItemsIds = _ref.visibleItemsIds,
      fixedIndex = _ref.fixedIndex,
      onGetFixedIndex = _ref.onGetFixedIndex,
      allItems = _ref.allItems;

  var toggleFixedState = function toggleFixedState(e) {
    var target = e.target;

    if (target && target.dataset && target.dataset.index) {
      var index = onGetFixedIndex && parseInt(target.dataset.index);

      if (index > fixedIndex) {
        onGetFixedIndex(index);
      } else {
        onGetFixedIndex(index - 1);
      }
    }
  };

  var calculateFixedState = function calculateFixedState(index) {
    var fixedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    return index <= fixedIndex;
  };

  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
    droppableId: draggableId,
    type: "all"
  }, function (provided) {
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, provided.droppableProps, {
      ref: provided.innerRef
    }), visibleItemsIds.map(function (item, index) {
      var isFixed = calculateFixedState(index, fixedIndex);
      var foundedColumn = (allItems || []).filter(function (column) {
        return column.id === item;
      });
      var columnName = foundedColumn[0] ? foundedColumn[0].name : null;
      return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
        key: "visible_item_".concat(item),
        draggableId: "id_".concat(item),
        index: index,
        isDragDisabled: isFixed
      }, function (provided, snapshot) {
        var isDragging = snapshot.isDragging ? "is-dragging" : "";
        var isFixedClass = isFixed ? "is-fixed" : "";
        return /*#__PURE__*/_react.default.createElement("div", _extends({
          className: "drag-object ".concat(isDragging, " ").concat(isFixedClass),
          "data-index": index,
          ref: provided.innerRef
        }, provided.draggableProps, provided.dragHandleProps, {
          style: provided.draggableProps.style,
          onDoubleClick: toggleFixedState
        }), /*#__PURE__*/_react.default.createElement("span", null, isFixed ? /*#__PURE__*/_react.default.createElement(_fa.FaLock, null) : /*#__PURE__*/_react.default.createElement(_fa.FaBars, null)), " ", columnName);
      });
    }), provided.placeholder);
  });
}