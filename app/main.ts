import {BrowserWindow,IpcMainEvent,IpcMainInvokeEvent,app, ipcMain} from "electron";
import {join} from "path";
import {homedir} from "os";
import normalise from "normalize-path";
import _ from "lodash";

import {renameGroupedItems} from "./lib/renamer";
import {flattenGroupedPaths} from "./lib/file-group";

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

    /** get the desktop dir as the default output dir */
    ipcMain.handle("get-default-output-dir",():string=>{
        return normalise(join(homedir(),"Desktop"));
    });

    /** execute rename request */
    ipcMain.handle("do-rename",(e:IpcMainInvokeEvent,request:RenameRequest):RenameRequestStatus=>{
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
                description:"error occurred: "+e,
            };
        }

        var operatorVerb:string="copied";

        if (request.renameMode=="move")
        {
            operatorVerb="moved";
        }

        return {
            status:"success",
            description:`successfully ${operatorVerb} ${flattenGroupedPaths(request.items).length}`,
        };
    });
}

main();