<?php

/**
 * @file
 * Contains \Drupal\dr_data_explorer\DataExplorerController.
 */

namespace Drupal\dr_data_explorer\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Html;
use Drupal\Core\Site\Settings;
use Drupal\dr_data_explorer\Form\Settings as FormSettings;

class DataExplorerController extends ControllerBase
{

    private function getDE_filePaths()
    {
        $module_path = drupal_get_path('module', 'dr_data_explorer');

        $de_settings_js = $module_path . "/js/de_settings/settings.js";
        $de_url_changer_js = $module_path . "/js/url_changer.js";
        $de_css = $module_path . "/css/data_explorer.css";


        $react_path = $module_path . '/de/static/';
        $react_js_files = glob($react_path . "js/*.js");
        $react_css_files = glob($react_path . "css/*.css");

        $ret = [
            'de_settings_js' => $de_settings_js,
            'de_url_changer_js'=>$de_url_changer_js,
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

    private function getUserConfig()
    {
        $config = \Drupal::config('dr_data_explorer.settings');
        $ret=[];
        $ret["title"]=$config->get("de_title");
        $ret["api_url"]=$config->get("de_api_url");
        return $ret;
        //var_dump($config->get("de_title"));
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
/*
        $user_config=[];
        $user_config["title"]=Settings::get("de_title",'Default title');


        //var_dump(Settings::getAll());

        $config = \Drupal::config('dr_data_explorer.settings');
        var_dump($config->get("de_title"));
*/

        $userConfig=$this->getUserConfig();
        var_dump($userConfig);
        
        $fPaths = $this->getDE_filePaths();
        $dqParams = $this->getQueryParams();
        $options = ["backendid" => "FUSION"];


        return [
            '#theme' => 'dr_data_explorer',
            '#attached' => [
                'library' => [
                    'dr_data_explorer/dr-data-explorer'
                ]
            ],
            '#title' => $userConfig["title"],
            '#files_to_add' => $fPaths,
            '#dqparams' => $dqParams,
            '#options' => $options,
            '#userconfig'=>$userConfig,
        ];
    }
}
