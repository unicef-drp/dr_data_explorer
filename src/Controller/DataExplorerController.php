<?php

/**
 * @file
 * Contains \Drupal\dr_data_explorer\DataExplorerController.
 */

namespace Drupal\dr_data_explorer\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Html;

class DataExplorerController extends ControllerBase
{

    private function getDE_filePaths()
    {
        $module_path = drupal_get_path('module', 'dr_data_explorer');

        $de_settings_js = $module_path . "/js/de_settings/settings.js";
        $de_css = $module_path . "/css/data_explorer.css";


        $react_path = $module_path . '/de/static/';
        $react_js_files = glob($react_path . "js/*.js");
        $react_css_files = glob($react_path . "css/*.css");

        $ret = [
            'de_settings' => $de_settings_js,
            'de_css' => $de_css,
            'react_css' => $react_css_files,
            'react_js' => $react_js_files,
        ];

        return $ret;
    }

    private function getQueryParams()
    {
        $ret = [
            "agency" => "",
            "dataflow" => "",
            "version" => "",
            "dq" => "",
            "startperiod" => "",
            "endperiod" => date("Y")
        ];
        $params = \Drupal::request()->query->all();
        if ($params != null) {
            if ($params["ag"] != null) $ret["agency"] = Html::escape($params["ag"]);
            if ($params["df"] != null) $ret["dataflow"] = Html::escape($params["df"]);
            if ($params["ver"] != null) $ret["version"] = Html::escape($params["ver"]);
            if ($params["dq"] != null) $ret["dq"] = str_replace(" ", "+", Html::escape($params["dq"]));
            if ($params["startPeriod"] != null) $ret["startperiod"] = Html::escape($params["startPeriod"]);
            if ($params["endPeriod"] != null) $ret["endperiod"] = Html::escape($params["endPeriod"]);
        }
        return $ret;
    }

    /**
     * Display the markup.
     *
     * @return array
     *   Return markup array.
     */
    public function content()
    {
        /*
        return [
            '#type' => 'markup',
            '#markup' => $this->t('Hello, World!'),
        ];
*/

        $fPaths = $this->getDE_filePaths();
        $dqParams = $this->getQueryParams();
        var_dump($dqParams);
        $options = ["backendid" => "FUSION"];


        return [
            '#theme' => 'dr_data_explorer',
            '#attached' => [
                'library' => [
                    'dr_data_explorer/dr-data-explorer'
                ]
            ],
            '#title' => "ttt4",
            '#files_to_add' => $fPaths,
            '#dqparams' => $dqParams,
            '#options' => $options,
        ];
    }
}
