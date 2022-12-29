CKEDITOR.addCss('span.lenta_gallery { background-color: #ffeec2; }');
CKEDITOR.addCss('span.lenta_service { background-color: #e46af6; }');
CKEDITOR.addCss('span.lenta_quote { background-color: #b8af28; }');
CKEDITOR.addCss('span.lenta_stage { background-color: #0075df; }');
CKEDITOR.addCss('span.lenta_events { background-color: #7556c4; }');

CKEDITOR.plugins.add( 'lenta_autocomplete', {
	requires: 'autocomplete,textmatch,placeholder',

	init: function( editor ) {
		editor.on( 'instanceReady', function(evt) {
			var config = {};

			var url = new URL(location.href);
			url.searchParams.append('autocomplete', 1);
			CKEDITOR.ajax.load( url.href, function( data ) {
				var PLACEHOLDERS = data;
				PLACEHOLDERS = JSON.parse(PLACEHOLDERS);

			    function textTestCallback(range) {
			      if (!range.collapsed) {
			        return null;
			      }

			      return CKEDITOR.plugins.textMatch.match(range, matchCallback);
			    }

			    function matchCallback(text, offset) {
			      var pattern = /\[{2}([a-zA-ZА-ЯЁа-яё\s\d]|\])*$/,
			        match = text.slice(0, offset)
			        .match(pattern);

			      if (!match) {
			        return null;
			      }

			      return {
			        start: match.index,
			        end: offset
			      };
			    }

			    function dataCallback(matchInfo, callback) {
					var data = PLACEHOLDERS.filter(function(item) {
						var itemName = '[[' + item.name.toLowerCase() + ']]';
						return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
					});
					callback(data);
			    }

		          var itemTemplate = '<li data-id="{el_id}"><div><strong class="item-title">{name}</strong></div></li>',
		            outputTemplate = '&nbsp;<span class="lenta_{type}" data-target="{id}">{name}</span>&nbsp;';


		          var autocomplete = new CKEDITOR.plugins.autocomplete(evt.editor, {
		            textTestCallback: textTestCallback,
		            dataCallback: dataCallback,
		            itemTemplate: itemTemplate,
		            outputTemplate: outputTemplate
		          });

		          autocomplete.getHtmlToInsert = function(item) {
		            return this.outputTemplate.output(item);
		          }
	        } );
      
    	});

	}
} );
