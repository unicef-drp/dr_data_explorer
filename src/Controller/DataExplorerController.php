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
    /**
     * Display the markup.
     *
     * @return array
     *   Return markup array.
     */
    public function content()
    {

        return [
            '#theme' => 'dr_data_explorer',
            '#attached' => [
                'library' => [
                    'dr_data_explorer/dr-data-explorer'
                ]
            ]
        ];
    }
}
