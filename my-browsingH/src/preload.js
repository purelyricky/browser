// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld( 'api', {
    newWindow: () => ipcRenderer.send('new-window'),
    toggleClickThrough: () => ipcRenderer.send('toggle-click-through')
})
