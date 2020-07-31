"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibleColumnsData = exports.availableColumnsData = void 0;
var availableColumnsData = [{
  id: "startTime",
  name: "Start Time"
}, {
  id: "stopTime",
  name: "Stop Time"
}, {
  id: "perPoint",
  name: "Per Point"
}, {
  id: "initialMargin",
  name: "Initial Margin"
}, {
  id: "Change %",
  name: "change%"
}, {
  id: "Change",
  name: "change"
}, {
  id: "Last",
  name: "last"
}, {
  id: "Last Volume",
  name: "lastVolume"
}, {
  id: "Bid",
  name: "bid"
}, {
  id: "Bid Size",
  name: "bidSize"
}, {
  id: "Ask",
  name: "ask"
}, {
  id: "Ask Size",
  name: "askSize"
}, {
  id: "Total Volume",
  name: "totalVolume"
}, {
  id: "High",
  name: "high"
}];
exports.availableColumnsData = availableColumnsData;
var visibleColumnsData = ["Change %", "Change", "Last", "Last Volume", "Bid", "Bid Size", "Ask", "Ask Size", "Total Volume", "High"];
exports.visibleColumnsData = visibleColumnsData;