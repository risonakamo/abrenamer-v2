// types for the bridge api available to backend

/** api available to frontend */
interface Bridge
{
    setItemsData(items:ItemsData):void
    getitemsData():Promise<ItemsData>
}