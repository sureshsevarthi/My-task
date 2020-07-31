"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnSetup;
exports.COLUMN_TYPE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _AvailableColumns = _interopRequireDefault(require("./AvailableColumns"));

var _VisibleColumns = _interopRequireDefault(require("./VisibleColumns"));

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var COLUMN_TYPE = {
  available: "AVAILABLE",
  visible: "VISIBLE"
};
exports.COLUMN_TYPE = COLUMN_TYPE;

var filterAvailableColumns = function filterAvailableColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var visibleColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return columns.filter(function (column) {
    return visibleColumns.indexOf(column.id) === -1;
  });
};

function ColumnSetup(_ref) {
  var availableColumns = _ref.availableColumns,
      visibleColumns = _ref.visibleColumns,
      fixedIndex = _ref.fixedIndex,
      onSave = _ref.onSave,
      onClose = _ref.onClose;

  var _useState = (0, _react.useState)(filterAvailableColumns(availableColumns, visibleColumns) || []),
      _useState2 = _slicedToArray(_useState, 2),
      currentAvailableColumns = _useState2[0],
      setCurrentAvailableColumns = _useState2[1];

  var _useState3 = (0, _react.useState)(visibleColumns),
      _useState4 = _slicedToArray(_useState3, 2),
      currentVisibleColumns = _useState4[0],
      setCurrentVisibleColumns = _useState4[1];

  var _useState5 = (0, _react.useState)(fixedIndex || -1),
      _useState6 = _slicedToArray(_useState5, 2),
      indexOfFixedRow = _useState6[0],
      setIndexOfFixedRow = _useState6[1];

  var handleClose = function handleClose() {
    onClose && onClose();
  }; // on drag end using react-beautiful-dnd


  var onDragEnd = function onDragEnd(result) {
    var source = result.source,
        destination = result.destination;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      switch (source.droppableId) {
        case COLUMN_TYPE.available:
          setCurrentAvailableColumns(reorder(currentAvailableColumns, source.index, destination.index));
          break;

        case COLUMN_TYPE.visible:
          if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
            setCurrentVisibleColumns(reorder(currentVisibleColumns, source.index, destination.index));
          }

          break;

        default:
      }
    } else {
      if (source.droppableId === COLUMN_TYPE.available && destination.droppableId === COLUMN_TYPE.visible) {
        if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
          replaceFromAvailableToVisible(source.index, destination.index);
        }
      } else if (source.droppableId === COLUMN_TYPE.visible && destination.droppableId === COLUMN_TYPE.available) {
        replaceFromVisibleToAvailable(source.index, destination.index);
      }
    }
  };

  var reorder = function reorder(list, startIndex, endIndex) {
    var result = Array.from(list);

    var _result$splice = result.splice(startIndex, 1),
        _result$splice2 = _slicedToArray(_result$splice, 1),
        removed = _result$splice2[0];

    result.splice(endIndex, 0, removed);
    return result;
  };

  var replaceFromAvailableToVisible = function replaceFromAvailableToVisible(fromAvailableIndex, toVisibleIndex) {
    var availableList = Array.from(currentAvailableColumns);

    var _availableList$splice = availableList.splice(fromAvailableIndex, 1),
        _availableList$splice2 = _slicedToArray(_availableList$splice, 1),
        removed = _availableList$splice2[0];

    setCurrentAvailableColumns(availableList);

    if (removed) {
      var visibleList = Array.from(currentVisibleColumns);
      visibleList.splice(toVisibleIndex, 0, removed.id);
      setCurrentVisibleColumns(visibleList);
    }
  };

  var replaceFromVisibleToAvailable = function replaceFromVisibleToAvailable(fromVisibleIndex, toAvailableIndex) {
    var visibleList = Array.from(currentVisibleColumns);

    var _visibleList$splice = visibleList.splice(fromVisibleIndex, 1),
        _visibleList$splice2 = _slicedToArray(_visibleList$splice, 1),
        removedId = _visibleList$splice2[0];

    setCurrentVisibleColumns(visibleList);
    var removedObject = removedId && availableColumns && availableColumns.filter(function (column) {
      return column.id === removedId;
    });

    if (removedObject && removedObject[0]) {
      var availableList = Array.from(currentAvailableColumns);
      availableList.splice(toAvailableIndex, 0, removedObject[0]);
      setCurrentAvailableColumns(availableList);
    }
  };

  var setFixedIndex = function setFixedIndex() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setIndexOfFixedRow(index);
  };

  var isNotFixedAreaCheck = function isNotFixedAreaCheck(targetIndex, fixedIndex) {
    return targetIndex > fixedIndex;
  };

  var handleSave = function handleSave() {
    var numberOfFixedColumns = currentVisibleColumns.filter(function (column, index) {
      return !isNotFixedAreaCheck(index, indexOfFixedRow);
    }).length;
    var visibleColumnsData = currentVisibleColumns.filter(function (column, index) {
      return isNotFixedAreaCheck(index, indexOfFixedRow);
    });
    var data = {
      visibleColumnsData: visibleColumnsData,
      numberOfFixedColumns: numberOfFixedColumns
    };
    onSave && onSave(data);
  };

  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: true,
    onHide: handleClose,
    className: "column-setup-modal",
    backdrop: "static"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "root"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("h4", null, "Configure Data Fields"), /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0"
  }, "Drag & drop between columns to configure visible data."))))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    xs: 6,
    className: "drag-list left-column"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Available"), /*#__PURE__*/_react.default.createElement(_AvailableColumns.default, {
    items: currentAvailableColumns,
    draggableId: COLUMN_TYPE.available
  })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    xs: 6,
    className: "drag-list right-column"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Visible"), /*#__PURE__*/_react.default.createElement(_VisibleColumns.default, {
    allItems: availableColumns,
    visibleItemsIds: currentVisibleColumns,
    draggableId: COLUMN_TYPE.visible,
    fixedIndex: indexOfFixedRow,
    onGetFixedIndex: setFixedIndex
  })))))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "primary",
    onClick: handleSave
  }, "Save"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "secondary",
    onClick: handleClose
  }, "Cancel"))));
}