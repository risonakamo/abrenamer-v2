import {BrowserWindow,IpcMainEvent,IpcMainInvokeEvent,app, ipcMain} from "electron";
import {join} from "path";

function main()
{
    app.on("ready",()=>{
        const window=new BrowserWindow({
            width:1520,
            height:890,
            minWidth:650,
            minHeight:500,
            webPreferences:{
                preload:join(__dirname,"bridge.js"),
            }
        });

        window.loadFile("abrenamer-v2-web/build/reorder-page.html");
    });

    /** current data being tracked for renaming */
    var currentItemsData:ItemsData={
        fileItemsData:{},
        fileGroups:[],
    };

    /** frontend setting the current items data */
    ipcMain.handle("set-items-data",(e:IpcMainInvokeEvent,itemsData:ItemsData):void=>{
        currentItemsData=itemsData;
    });

    /** get the current items data */
    ipcMain.handle("get-items-data",(e:IpcMainInvokeEvent):ItemsData=>{
        return currentItemsData;
    });
}

main();