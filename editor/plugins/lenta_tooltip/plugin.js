CKEDITOR.addCss('span.lenta_tooltip { background-color: #66cc66; }');

CKEDITOR.plugins.add( 'lenta_tooltip', {
    init: function( editor ) {
        editor.addCommand( 'lenta_tooltip', new CKEDITOR.dialogCommand( 'lenta_tooltipDialog' ) );
        editor.ui.addButton( 'wiki_steal', {
            label: 'Добавить подсказку',
            command: 'lenta_tooltip',
            toolbar: 'insert',
            icon: CKEDITOR.plugins.getPath('lenta_tooltip') + 'icon.png'
        });

        CKEDITOR.dialog.add( 'lenta_tooltipDialog', this.path + 'dialogs/lenta_tooltip.js' );
    }
});
