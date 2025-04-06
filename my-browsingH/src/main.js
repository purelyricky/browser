import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

function registerShortcuts(mainWindow) {
  // Move window shortcuts
  globalShortcut.register('Control+Up', () => {
    const [x, y] = mainWindow.getPosition();
    mainWindow.setPosition(x, y - 20);
  });
  
  globalShortcut.register('Control+Down', () => {
    const [x, y] = mainWindow.getPosition();
    mainWindow.setPosition(x, y + 20);
  });
  
  globalShortcut.register('Control+Left', () => {
    const [x, y] = mainWindow.getPosition();
    mainWindow.setPosition(x - 20, y);
  });
  
  globalShortcut.register('Control+Right', () => {
    const [x, y] = mainWindow.getPosition();
    mainWindow.setPosition(x + 20, y);
  });
  
  // Toggle visibility shortcut
  globalShortcut.register('Control+Alt+H', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
  
  // Translucency control
  globalShortcut.register('Control+Alt+=', () => {
    const currentOpacity = mainWindow.getOpacity();
    if (currentOpacity < 1.0) {
      mainWindow.setOpacity(Math.min(1, currentOpacity + 0.1));
    }
  });
  
  globalShortcut.register('Control+Alt+-', () => {
    const currentOpacity = mainWindow.getOpacity();
    if (currentOpacity > 0.1) {
      mainWindow.setOpacity(Math.max(0.1, currentOpacity - 0.1));
    }
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../public/icon.ico'),
    resizable: true,  // Ensure window is resizable
    frame: true,      // Keep window frame for resizing
    backgroundColor: '#ffffff',  // Set background color instead of transparency
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
  });

  // Set initial opacity
  mainWindow.setOpacity(0.7);
  mainWindow.setAlwaysOnTop(true, 'screen');

  // Register keyboard shortcuts
  registerShortcuts(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Clean up shortcuts when app is quitting
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('new-window', createWindow);
