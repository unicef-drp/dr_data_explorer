<?php
namespace Drupal\dr_data_explorer\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
* Configure settings for this module.
*/
class Settings extends ConfigFormBase {
/**
 * {@inheritdoc}
 */
    public function getFormId() {
        return 'dr_data_explorer_settings';
    }

/**
 * {@inheritdoc}
 */
    protected function getEditableConfigNames() {
        return [
            'dr_data_explorer.settings',
        ];
    }

/**
 * {@inheritdoc}
 */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('dr_data_explorer.settings');
 
    $form['de_title'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Title'),
      '#description' => $this->t('The page title.'),
      '#default_value' => $config->get('de_title'),
    );

    $form['de_api_url'] = array(
        '#type' => 'textarea',
        '#title' => $this->t('Api URL'),
        '#description' => $this->t('e.g: {fusion: { url: "https://sdmx.data.unicef.org/ws/public/sdmxapi/rest", hasRangeHeader: !0, supportsReferencePartial: !1 }}'),
        '#default_value' => $config->get('de_api_url'),
      );
      //Uset to show hierarchies, disabled at the moment
/*
      $form['de_hierarchy_cfg'] = array(
        '#type' => 'textarea',
        '#title' => $this->t('Hierarchy'),
        '#description' => $this->t('e.g: {agencyId:"UNICEF", id:"REGIONS_HIERARCHY"}'),
        '#default_value' => $config->get('de_hierarchy_cfg'),
      );

      $form['de_forced_dims'] = array(
        '#type' => 'textarea',
        '#title' => $this->t('Forced dims'),
        '#description' => $this->t('e.g: {fusion: { url: "https://sdmx.data.unicef.org/ws/public/sdmxapi/rest", hasRangeHeader: !0, supportsReferencePartial: !1 }}'),
        '#default_value' => $config->get('de_forced_dims'),
      );
*/

    $form['de_indicator_profile_url'] = array(
        '#type' => 'textfield',
        '#title' => $this->t('Indicator profile URL'),
        '#description' => $this->t('The URL to the indicator profiles page.'),
        '#default_value' => $config->get('de_indicator_profile_url'),
    );

    $form['de_help_url'] = array(
        '#type' => 'textfield',
        '#title' => $this->t('Help URL'),
        '#description' => $this->t('The URL to the help page.'),
        '#default_value' => $config->get('de_help_url'),
    );

 
    return parent::buildForm($form, $form_state);
  }

/**
 * {@inheritdoc}
 */
public function submitForm(array &$form, FormStateInterface $form_state) {
    // Retrieve the configuration
     $this->configFactory->getEditable('dr_data_explorer.settings')
    // Set the submitted configuration setting
    ->set('de_title', $form_state->getValue('de_title'))
    ->set('de_api_url', $form_state->getValue('de_api_url'))
    ->set('de_indicator_profile_url', $form_state->getValue('de_indicator_profile_url'))
    ->set('de_help_url', $form_state->getValue('de_help_url'))
    //->set('de_hierarchy_cfg', $form_state->getValue('de_hierarchy_cfg'))
    //->set('de_forced_dims', $form_state->getValue('de_forced_dims'))
    ->save();

  parent::submitForm($form, $form_state);
}

}
