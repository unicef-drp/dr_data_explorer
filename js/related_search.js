/*Searches for related datasets*/
/*NOT USED AT THE MOMENT*/

//HANDLE THE Enabled/disabled in ALGOLIA.enabled
var searchClient = null;
var indexName = null;
var resultsCount = null;

if (ALGOLIA.enabled) {
    searchClient = algoliasearch(ALGOLIA.app_name, ALGOLIA.public_key);
    indexName = ALGOLIA.idx_name;
    //indexName = 'data_unicef_org_splash';
    resultsCount = ALGOLIA.max_res;
}

//https://unicef-registry.sdmxcloud.org/ws/public/sdmxapi/rest/data/UNICEF,PT_FGM,1.0/BEN+BFA............?format=sdmx-json&includeHistory=true&includeMetadata=true&dimensionAtObservation=AllDimensions&includeAllAnnotations=true
//https://unicef-registry.sdmxcloud.org/ws/public/sdmxapi/rest/data/UNICEF,PT_FGM,1.0/BEN+BFA............?format=sdmx-json&includeHistory=true&includeMetadata=true&dimensionAtObservation=AllDimensions&includeAllAnnotations=true
//https://api.data.unicef.org/sdmx/Rest/                       data/UNICEF,CME_DF,1.0/...../?dimensionAtObservation=AllDimensions&startPeriod=2017&endPeriod=2018

//Search takes into account the values for each dimension(e.g. years, indicators, ref areas) bt it is limited: if a dimension contains too many keys it is not specific => ignore


(function () {

    let search_hits = null;

    let resultPosition = 0;
    const maxDimensionValuesForSearch = 4;
    const visibleResults = 4;

    let algo_index = null;
    if (ALGOLIA.enabled)
        algo_index = searchClient.initIndex(indexName);

    let currentid;
    /*listens for data load events*/
    if (ALGOLIA.enabled) {
        document.getElementById('root').addEventListener('unicef_dataflowLoaded', function (evt) {
            searchTerms = evt.detail.dataflow.agencyId + " " + evt.detail.data.structure.name;
            searchTerms = searchTerms + " " + getAdditionalKeywordsForSearch(evt.detail);

            dataq = evt.detail.dataflow.dataquery;
            if (dataq.endsWith("/")) { dataq = dataq.substring(0, dataq.length - 1); }
            let df = evt.detail.dataflow

            currentid = df.datasourceId + "|" + df.agencyId + "|" + df.dataflowId + "|" + df.version + "|" + dataq;
            window.history.pushState({ 'ag': df.agencyId, 'df': df.dataflowId, 'ver': df.version, 'dq': dataq },
                df.dataflowId,
                `?ag=${df.agencyId}&df=${df.dataflowId}&ver=${df.version}&dq=${dataq}&startPeriod=${df.period[0]}&endPeriod=${df.period[1]}`);
            //http://localhost/resources/data_explorer/unicef_f/?ag=UNICEF&df=CHLD_PVTY&ver=1.0&dq=.PV.&startPeriod=2015&endPeriod=2019
            //http://localhost/resources/data_explorer/unicef_f/page2.php
            search_related(searchTerms, currentid);
        });
    }

    //Looks in the event details for additional search terms
    function getAdditionalKeywordsForSearch(detail) {
        toret = "";
        dims = detail.data.structure.dimensions.observation;
        dims.forEach(function (element) {
            if (element.values.length <= maxDimensionValuesForSearch) {
                element.values.forEach(function (val) {
                    toret = toret + " " + val.name;
                });
            }
        });
        return toret;
    }

    /*document.getElementById('root').addEventListener('unicef_dataflowLoaded', event =>
        console.log('unicef_dataflowLoaded event dispatched', event.detail))*/

    /*
    This js code is called on Data Explorer page load, it needs the Algolia's resource ID
    It triggers a first search with the Algolia's resource ID, this will return the record as it is stored in Algolia
    From the Record returned in Algolia it takes some values (to be decided) and triggers a second search for relevant results
    */
    function search_related(terms, currentid) {
        algo_index.search({
            query: terms,
            removeWordsIfNoResults: "allOptional",
            hitsPerPage: resultsCount,
            //facetFilters: ["post_type:Dataset"],
            filters: 'NOT objectID:' + currentid
        }).then(renderHits_related);
    }

    var emptySearchParams;
    function renderHits_related(res) {
        params = {
            hits: res.hits
        }
        //stores the results, used if the searchbox is empty -> show the default related results.
        emptySearchParams = params;
        renderHits(params, false);
    }

    function createCustomEvent(df) {
        let backID = df.sdmx_endpoint_id=="fusion"?"FUSION":"";
        let now = new Date().getFullYear();
        let last = df.query_info.lastYear - 3
        evtDetails = { detail: { backendId: backID, datasourceId: df.sdmx_endpoint_id, agencyId: df.agency, dataflowId: df.dataflow, version: df.version, dataquery: df.query_info.dataquery, period: [last, now] } };
        return evtDetails;
    }

    var algo_search = null;
    if (ALGOLIA.enabled) {
        var algo_search = instantsearch({
            indexName: indexName,
            searchClient: searchClient,
            searchFunction: function (helper) {
                if (helper.state.query === '') {
                    if (emptySearchParams != null)
                        renderHits(emptySearchParams, false);
                } else {
                    helper.search();
                }
            },
            searchParameters: {
                hitsPerPage: resultsCount,
                //facetFilters: ["post_type:Dataset"]
            }
        });


        algo_search.addWidget(
            instantsearch.widgets.searchBox({
                container: "#related_search_box",
                placeholder: "Search for datasets",
            })
        );
    }

    /*Creates the HTML content for a single search result (a hit)*/
    const createResItem = function (hit) {
        ret = `<span class="rel_item_title">${hit.Indicator}</span>`
        /*
        ret = `<span class="rel_item_title">${hit.post_title}</span>
        <span class="rel_item_subtitle">${typeof hit.available_dims[0] === "undefined" ? "" : hit.available_dims[0]}</span>
        <span class="rel_item_subtitle">${typeof hit.available_dims[1] === "undefined" ? "" : hit.available_dims[1]}</span>`
        
        if ((hit.available_dims.length - 2) > 0) {
            popup = "";
            for (h = 2; h < hit.available_dims.length; h++) {
                popup = popup + hit.available_dims[h] + "</br>";

            }
            ret = ret + `<div class="rel_item_subtitle_more"><span class="tooltiptext">${popup}</span>${(hit.available_dims.length - 2) + " more."}</div>`;
        }
        */


        return ret;
    }

    // Called when results are coming back from Algolia
    const renderHits = function (renderOptions, isFirstRender) {
        resultPosition = 0;

        if (!renderOptions || !renderOptions.hits) {
            search_hits = null;
            renderReults(0);
            return;
        }
        search_hits = renderOptions.hits;
        if (isFirstRender) return;
        renderReults(0);
    };


    //Renders the results, taking into account the scroll position
    const renderReults = function (startAt) {
        if (search_hits == null) {
            showScrollers(false);
            showRelRes(false);
            return;
        }
        showRelRes(true);
        if (search_hits.length > visibleResults)
            showScrollers(true);
        else
            showScrollers(false);

        de_root = document.getElementById('root');
        res = jQuery("#dfrelated_res .related_item");

        for (i = 0; i < visibleResults; i++) {
            if (i + startAt >= search_hits.length) {
                jQuery(res[i]).css("visibility", "hidden").prop("onclick", null).off("click");
            }
            else {

                //newText = createResItem(search_hits[i + startAt]);
                jQuery(res[i]).html(createResItem(search_hits[i + startAt]));
                jQuery(res[i]).animate({ 'opacity': 0.5 }, 150, function () { jQuery(this).animate({ 'opacity': 1 }, 150) });
                //attach the events
                res[i].onclick = (function () {
                    //var tevt = createCustomEvent(search_hits[i + startAt].dataflow_params);
                    var tevt = createCustomEvent(search_hits[i + startAt]);
                    return function () {
                        de_root.dispatchEvent(new CustomEvent('unicef_changeDataflow', tevt));
                    }
                })();
                jQuery(res[i]).css("visibility", "visible");
            }
        }
    }

    if (ALGOLIA.enabled) {
        // Create the custom widget
        const customHits = instantsearch.connectors.connectHits(renderHits);
        // Instantiate the custom widget
        algo_search.addWidget(
            customHits({
                container: document.querySelector('#dfNavContents')
            })
        );

        algo_search.start();
    }


    /*Scroll handling*/
    function showRelRes(vis) {
        if (vis) {
            jQuery("#dfrelated_res").css("visibility", "visible");
        }
        else
            jQuery("#dfrelated_res").css("visibility", "hidden");
    }
    function showScrollers(vis) {
        if (vis)
            jQuery('.advancer').css("display", "");
        else
            jQuery('.advancer').css("display", "none");
    }

    scrollRight = function () {
        if (search_hits == null)
            return;
        if ((resultPosition + 1) * visibleResults > search_hits.length)
            return;
        resultPosition += 1;
        renderReults(resultPosition * visibleResults);
    }

    scrollLeft = function () {
        if (search_hits == null)
            return;
        if (resultPosition == 0)
            return;
        resultPosition -= 1;
        renderReults(resultPosition * visibleResults);
    }

    jQuery('.advancer_r').on('click', function () { scrollRight(); });
    jQuery('.advancer_l').on('click', function () { scrollLeft(); });

})();
