import {BrowserWindow,IpcMainInvokeEvent,app,ipcMain,screen} from "electron";
import {join,normalize} from "path";
import {homedir} from "os";
import normalise from "normalize-path";
import _ from "lodash";

import {renameGroupedItems} from "./lib/renamer";
import {flattenGroupedPaths} from "./lib/file-group";
import {formatDate,openFileExplorer} from "./lib/utils";

function main()
{
    app.on("ready",()=>{
        const display:Electron.Size=screen.getPrimaryDisplay().workAreaSize;

        const window=new BrowserWindow({
            width:Math.round(display.width*.78),
            height:Math.round(display.height*.85),
            minWidth:900,
            minHeight:620,
            webPreferences:{
                preload:join(__dirname,"bridge.js"),
            }
        });

        window.loadFile("abrenamer-v2-web/build/reorder-page.html");
    });



    // --- app state
    /** current data being tracked for renaming */
    var currentItemsData:ItemsData={
        fileItemsData:{},
        fileGroups:[],
    };



    // --- apis
    /** frontend setting the current items data */
    ipcMain.handle("set-items-data",(e:IpcMainInvokeEvent,itemsData:ItemsData):void=>{
        currentItemsData=itemsData;
    });

    /** get the current items data */
    ipcMain.handle("get-items-data",():ItemsData=>{
        return currentItemsData;
    });

    /** fully reset the items data */
    ipcMain.handle("clear-items-data",():void=>{
        currentItemsData={
            fileItemsData:{},
            fileGroups:[],
        };
    });

    /** get the desktop/out dir as the default output dir */
    ipcMain.handle("get-default-output-dir",():string=>{
        return normalise(join(homedir(),"Desktop","out"));
    });

    /** execute rename request */
    ipcMain.handle("do-rename",
    (e:IpcMainInvokeEvent,request:RenameRequest):RenameRequestStatus=>{
        try
        {
            renameGroupedItems(
                request.items,
                request.groupRenameRule,
                request.itemRenameRule,
                request.outputDir,
                request.renameMode,
            );
        }

        catch (e)
        {
            console.error(e);

            return {
                status:"error",
                description:formatDate(new Date())+": "+_.toString(e),
            };
        }

        var operatorVerb:string="copied";

        if (request.renameMode=="move")
        {
            operatorVerb="moved";
        }

        const dateText:string=formatDate(new Date());
        return {
            status:"success",
            description:`${dateText}: successfully ${operatorVerb} ${flattenGroupedPaths(request.items).length} items`,
        };
    });

    /** request to open file explorer to some path */
    ipcMain.handle("open-explorer",(e:IpcMainInvokeEvent,folder:string):void=>{
        console.log("opening explorer:",normalize(folder));
        openFileExplorer(folder);
    });
}

main();