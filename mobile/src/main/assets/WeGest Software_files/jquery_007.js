"use strict";
(function( $ ) {

	$.fn.ZSearch.pulsanti = function( options  ) {
	
		//==================================================================

		//opzioni di default
		 var settings = $.extend({
			pulsanti: "",
			gruppo: ""
		}, options );
		
		//==================================================================

		var $this			= $(this);
		var obj_pulsanti	= $this.find(settings.pulsanti).filter(settings.gruppo);
		
		//==================================================================

		obj_pulsanti.click(function(e) {

			var pulsante_cliccato	= $(this);
			var pul_checkbox		= pulsante_cliccato.find("input[type='checkbox']");
			
			//Rimuove la selezione dagli altri pulsanti
			if ( pulsante_cliccato.hasClass("esclusivo") ) {
				obj_pulsanti.not( pulsante_cliccato )
					.removeClass("attivo")
					.find("i")
						.removeClass("fa-check-square-o")
						.addClass("fa-square-o")
					.end()
					.find("input[type='checkbox']")
						.prop({checked: false});
			}
			else {
				obj_pulsanti.filter(".esclusivo").not( pulsante_cliccato )
					.removeClass("attivo")
					.find("i")
						.removeClass("fa-check-square-o")
						.addClass("fa-square-o")
					.end()
					.find("input[type='checkbox']")
						.prop({checked: false});
			}
			
			//Seleziona o deseleziona il pulsante cliccato
			pul_checkbox.is( ":checked" ) ? pul_checkbox.prop({checked: false}) : pul_checkbox.prop({checked: true});
			pul_checkbox.change();
			pulsante_cliccato.find("i").toggleClass("fa-check-square-o fa-square-o");
			pulsante_cliccato.toggleClass("attivo");
			
			//Se clicco su un pulsante esclusivo non deve poter essere deselezionato
			
			//Se deseleziono tutti i pulsanti non esclusivi, quello esclusivo viene selezionato
		});
		
		//==================================================================

	};
	
})( jQuery );