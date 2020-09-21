<?php

/**
 * @file
 * Contains \Drupal\dr_data_explorer\DataExplorerController.
 */

namespace Drupal\dr_data_explorer\Controller;

use Drupal\Core\Controller\ControllerBase;

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
            '#type' => 'markup',
            '#markup' => $this->t('Hello, World!'),
        ];
    }
}

?>