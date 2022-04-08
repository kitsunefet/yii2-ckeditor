<?php
/**
 * Date: 18.01.14
 * Time: 22:16
 */

namespace kitsunefet\widget;

use yii\web\AssetBundle;


class AssetsJQueryAdapter extends AssetBundle{

	public $sourcePath = '@kitsunefet/ckeditor/editor/adapters';

    public $js = [
        'jquery.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'kitsunefet\ckeditor\Assets'
    ];
}