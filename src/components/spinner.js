import { Spinner } from 'spin.js';

var opts = {
    lines: 12, // The number of lines to draw
    length: 30, // The length of each line
    width: 17, // The line thickness
    radius: 21, // The radius of the inner circle
    scale: 0.45, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 2.2, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#5597d4', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '47%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};
const target = document.getElementById('root');
const spinner = new Spinner(opts);

export const startSpinner = () => {
    spinner.spin(target);
}
export const stopSpinner = () => {
    spinner.stop();
}