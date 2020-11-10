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
        $ret["de_indicator_profile_url"]=$config->get("de_indicator_profile_url");
        $ret["de_help_url"]=$config->get("de_help_url");
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
        $userConfig=$this->getUserConfig();
        var_dump($userConfig);
        
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
            '#dqparams' => $dqParams,
            '#options' => $options,
            '#userconfig'=>$userConfig,
        ];
    }
}
