import {BrowserWindow,app} from "electron";

function main()
{
    app.on("ready",()=>{
        const window=new BrowserWindow({
            width:1520,
            height:890,
            minWidth:650,
            minHeight:500,
        });

        window.loadFile("abrenamer-v2-web/build/reorder-page.html");
    });
}

main();