// defines frontend api

import {contextBridge, ipcRenderer} from "electron";

const bridge:Bridge={
    setItemsData(items:ItemsData):void
    {
        ipcRenderer.invoke("set-items-data",items);
    },

    getItemsData():Promise<ItemsData>
    {
        return ipcRenderer.invoke("get-items-data");
    },

    clearItemsData():Promise<void>
    {
        return ipcRenderer.invoke("clear-items-data");
    },

    getDefaultOutputDir():Promise<string>
    {
        return ipcRenderer.invoke("get-default-output-dir");
    },

    doRename(renameRequest:RenameRequest):Promise<RenameRequestStatus>
    {
        return ipcRenderer.invoke("do-rename",renameRequest);
    },
};

contextBridge.exposeInMainWorld("electron",bridge);