const electron = require('electron');
url = require('url');
path = require('path');

const {app,BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;


//Listen for app to be ready
app.on('ready',function (){
  //create new mainWindow
  mainWindow = new BrowserWindow({});
  //load html into window
  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname, 'mainWindow.html'),
    protocol:'file',
    slashes:true
  }));

  //Quit app when closed
  mainWindow.on('closed',function(){
    app.quit();
  })

  //Build Menu from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
})


//HANDLE CREATE ADD WINDOW
function createAddWindow(){
  //create new Window
  addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add Shopping List Item'
  });

  //load html into window
  addWindow.loadURL(url.format({
    pathname:path.join(__dirname, 'addWindow.html'),
    protocol:'file',
    slashes:true
  }));

  //Garbage collection handle
  addWindow.on("close",function (){
    addWindow = null;
  });
}



//Create Menu Template
const mainMenuTemplate = [
  {
    label:'file',
    submenu:[
      {
        label:'Add Item',
        click(){createAddWindow()}
      },
      {label:'Clear Items'},
      {
        label:'Quit',
        accelerator:process.platform == 'darwin'? 'Command+Q' : 'Ctrl+Q',
        click(){app.quit()}
      }
    ]
  }
]
