// defines frontend api

import {contextBridge, ipcRenderer} from "electron";

const bridge:Bridge={
    setItemsData(items:ItemsData):void
    {
        ipcRenderer.invoke("set-items-data",items);
    },

    getitemsData():Promise<ItemsData>
    {
        return ipcRenderer.invoke("get-items-data");
    }
};

contextBridge.exposeInMainWorld("electron",bridge);