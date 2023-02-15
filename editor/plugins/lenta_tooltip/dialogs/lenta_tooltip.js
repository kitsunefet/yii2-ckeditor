//
function getRangeHtml(range) {
    var content = range.extractContents();
    var children = content.$.childNodes;
    var html = '';
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (typeof child.outerHTML === 'string') {
            html += child.outerHTML;
        } else {
            html += child.textContent;
        }
    }
    return html;
}

function getSelectionHtml(selection) {
    var ranges = selection.getRanges();
    var html = '';
    for (var i = 0; i < ranges.length; i++) {
        html += getRangeHtml(ranges[i]);
    }
    return html;
}

var color_table=[];

function escapeHtml(unsafe)
{
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

CKEDITOR.dialog.add( 'lenta_tooltipDialog', function( editor ) {
    return {
        title: 'Подсказка',
        minWidth: 400,
        minHeight: 150,
        contents: [
            {
                id: 'tab-basic',
                label: 'Подсказка',
                elements: [
                    {
                        type: 'text',
                        id: 'text',
                        label: 'Текст в контенте',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Введите текст." )
                    },
                    {
                        type: 'textarea',
                        id: 'tooltip',
                        label: 'Текст подсказки',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Введите подсказку." )
                    },
                ]
            },
        ],
        onOk: function() {
            var dialog = this;

            var text = dialog.getValueOf( 'tab-basic', 'text' );
            var tooltip = dialog.getValueOf( 'tab-basic', 'tooltip' );

            editor.insertHtml('&nbsp;<span class="lenta_tooltip" data-tooltip="'+escapeHtml(tooltip)+'">'+escapeHtml(text)+'</span>&nbsp;');

        }
    };
});
