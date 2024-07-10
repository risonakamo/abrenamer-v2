import {BrowserWindow,app} from "electron";

function main()
{
    app.whenReady().then(()=>{
        const window=new BrowserWindow({
            width:1520,
            height:890,
            minWidth:650,
            minHeight:500,
        });

        window.loadFile("abrenamer-v2-web/build/index.html");
    });
}

main();