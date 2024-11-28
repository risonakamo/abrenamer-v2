// types for the bridge api available to backend

/** api available to frontend */
interface Bridge
{
    setItemsData(items:ItemsData):void
    getItemsData():Promise<ItemsData>
    getDefaultOutputDir():Promise<string>
    doRename(renameRequest:RenameRequest):Promise<RenameRequestStatus>
}