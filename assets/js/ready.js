"use strict";

function ready(cb) {
    //Wenn der DOM geladen ist, dann die übergebene Funktion cb aufrufen
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        console.log('DOM is ready');
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", function(){
            console.log('DOM is ready (DOMContentLoaded)');
            cb();
        });
    }
}