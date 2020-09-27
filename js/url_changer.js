(function () {

document.getElementById('root').addEventListener('unicef_dataflowLoaded',function(evt){
    let url = window.location.href;
    //replace the trainling / if present
    let newDq=evt.detail.dataquery.replace(/\/$/,"");
    let urlRepl=url.replace(/dq=[^&]*/, "dq="+newDq);
    urlRepl=urlRepl.replace(/startPeriod=[^&]*/, "startPeriod="+evt.detail.requestArgs.startPeriod);
    urlRepl=urlRepl.replace(/endPeriod=[^&]*/, "endPeriod="+evt.detail.requestArgs.endPeriod);
    window.history.pushState({}, "UNICEF Data", urlRepl);
});

})();