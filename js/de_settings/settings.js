var SETTINGS = {
    sdmx: {
        range: [0, 1e3],
        attributes: { flags: ["OBS_STATUS"], footnotes: ["TIME_FORMAT"], prefscale: "PREF_SCALE", decimals: "DECIMALS" },
        period: { boundaries: [1970, new Date().getFullYear()], default: [2018, new Date().getFullYear()] },
        datasources: {
            // ILO: { url: "https://ilo.org/ilostat-test/sdmx/ws/rest", hasRangeHeader: !0, supportsReferencePartial: !1 },
            //UNICEF: { url: "https://api.data.unicef.org/sdmx/Rest", hasRangeHeader: !0, supportsReferencePartial: !1 },
            //CME: { url: "https://api.data.unicef.org/sdmx/Rest", hasRangeHeader: !0, supportsReferencePartial: !1 }
            //https://unicef-registry.sdmxcloud.org/ws/public/sdmxapi/rest/data/UNICEF,PT_FGM,1.0/BEN+BFA............?format=sdmx-json&includeHistory=true&includeMetadata=true&dimensionAtObservation=AllDimensions&includeAllAnnotations=true
        }
    },
    chart: { url: "", source: "", options: { base: { height: 400 }, axis: { x: { font: { family: "'Segoe UI'" } }, y: { linear: { step: 5 }, font: { family: "'Segoe UI'" } } }, serie: { annotation: { font: { family: "'Segoe UI'" } }, tooltip: { font: { family: "'Segoe UI'" } } } }, size: { height: 400 } }, i18n: { localeId: "en", locales: { en: { id: "en", delimiters: { thousands: ",", decimal: "." } } } },
    //unicef: { "indicatorProfileUrl": "../../../indicator-profile" }
    unicef:{},
    hierarchy:{}
}

var I18N = {
    en: {
        "de.error.title": "Whoops, something went wrong on our end.",
        "de.visualisation.data.loading": "loading data...",
        "de.visualisation.structure.loading": "loading structure...",
        "de.visualisation.loading": "loading structure and data...",
        "vx.spotlight.placeholder": "search...",
        "vx.spotlight.placeholder.primary": "search on all",
        "vx.spotlight.placeholder.secondary": "search on current",
        "de.side.filters.action": "Filters",
        "de.filter.period.title": "Select time period",
        "de.filter.period.tag": "{min} - {max}",
        "de.filter.period.lastnobs":"Show latest data only",
        "de.visualisation.toolbar.show": "Show:",
        "de.visualisation.toolbar.table": "Table",
        "de.visualisation.toolbar.chart": "Chart",
        "de.visualisation.toolbar.chart.bar": "Bar chart",
        "de.visualisation.toolbar.chart.row": "Row chart",
        "de.visualisation.toolbar.chart.timeline": "Timeline chart",
        "de.visualisation.toolbar.action.fullscreen": "Full screen",
        "de.visualisation.toolbar.action.customize": "Customise",
        "de.visualisation.toolbar.action.download": "Download",
        "de.visualisation.toolbar.action.download.excel.selection": "Selection in Excel (current table layout)",
        "de.visualisation.toolbar.action.download.csv.selection": "Selection in CSV (long format)",
        "de.visualisation.toolbar.action.download.csv.all": "Full data in CSV (long format)",
        "de.visualisation.toolbar.action.help":"Help",
        "vx.no.data": "No data", "vx.filters.current.title": "Selected filters",
        "vx.filters.current.clear": "Clear all filters",
        "vx.filters.filterdata":  "Filter data",
        "vx.filters.close":  "Close",
        "de.table.layout.apply": "Apply",
        "de.table.layout.cancel": "Cancel",
        "de.table.layout.value.one": "In the subtitle",
        "de.table.layout.time": "Time dimension",
        "de.table.layout.time.asc": "ascending",
        "de.table.layout.time.desc": "descending",
        "de.table.layout.y": "Columns",
        "de.table.layout.x": "Rows",
        "de.table.layout.z": "Section",
        "de.table.layout.getter.dimension": "Format",
        "de.table.layout.help": "Drag dimensions between columns, rows and row sections",
        "de.table.layout.title": "Organize your table",
        "vx.config.display.label": "name",
        "vx.config.display.code": "code",
        "vx.config.display.both": "both",
        "footnotes": "Footnotes",

        "de.IndicatorLinkUnicef.goToIndicator": "View the indicator profile for any selected indicator:",
        "de.dataflowNavigator.findMoreData":"Find in-depth data on",
    }
}


SETTINGS.sdmx.datasources = SETTINGS_override;
SETTINGS.unicef = unicef_settings;
SETTINGS.hierarchy=HIERARCHY_override;
