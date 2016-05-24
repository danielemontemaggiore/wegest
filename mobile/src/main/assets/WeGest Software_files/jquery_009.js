"use strict";
(function( $ ) {

	$.fn.ZSearch_select = function() {

		//==================================================================

		var this_select				= this;
		var this_select_ID			= this_select.attr("id");
		var this_select_Titolo		= this_select.attr("titolo");
		var this_option_selected	= this_select.find("option:selected");
		
		var obj_Modale_Pulsante;
		var obj_Modale_Sfondo;
		var obj_Modale;
		var obj_Modale_Titolo;
		var obj_Modale_Body;
		var obj_Modale_Annulla;

		//==================================================================
		
		//Nasconde il select ed aggiunge l'impostor
		this_select
			.hide()
			.after("<div class=\"pulsante select_modale_pulsante select_modale_" + this_select_ID + "\">" + 
					(this_option_selected.val() == "" ? this_select_Titolo : this_option_selected.text()) + " <i class=\"fa fa-caret-down\"></i>" + 
					"</div>" +
					"<div class=\"select_modale select_modale_" + this_select_ID + "\">" +
					"  <div class=\"select_modale_titolo\">" +
					"    <div style=\"font-size:1.5em;\">" + this_select_Titolo + "</div>" +
					"    <div style=\"font-size:0.8em;\">Seleziona una delle opzioni</div>" +
					"  </div>" +
					"  <div class=\"select_modale_body select_modale_" + this_select_ID + "\"></div>" +
					"  <div class=\"select_modale_annulla select_modale_" + this_select_ID + "\">Annulla</div>" +
					"</div>" +
					"<div class=\"select_modale_sfondo select_modale_" + this_select_ID + "\"></div>");
		
		//==================================================================
		
		obj_Modale_Pulsante		= $(".select_modale_pulsante.select_modale_" + this_select_ID);
		
		obj_Modale_Sfondo		= $(".select_modale_sfondo.select_modale_" + this_select_ID);
		
		obj_Modale				= $(".select_modale.select_modale_" + this_select_ID);
		
		obj_Modale_Body			= obj_Modale.find(".select_modale_body.select_modale_" + this_select_ID);
		
		obj_Modale_Annulla		= obj_Modale.find(".select_modale_annulla.select_modale_" + this_select_ID);
		
		//==================================================================
		
		//Click sul select impostor
		obj_Modale_Pulsante.click(function(e) {

			//avvia l'animazione dello sfondo
			obj_Modale_Sfondo
				.fadeIn()
				.width($(window).width())
				.height($(window).height())
				.position({
					my: "left",
					at: "left",
					of: $(window)
				});

			//avvia l'animazione della finestra modale
			obj_Modale
				.width(0)
				.height(0)
				.find(".modale_elenco")
					.html("")
				.end()
				.position({
					my: "center",
					at: "center",
					of: obj_Modale_Pulsante
				})
				.css("visibility", "visible")
				.animate({
					left: (($(window).width() - 340) / 2) + 'px',
					top: (($(window).height() - 400) / 2) + 'px',
					width:"340px", 
					height:"400px"
				});
			
			
			//svuota il body
			obj_Modale_Body.html("");

			//Cicla tra i valori del select e li aggiunge all'impostor
			this_select.find("option")
				.each(function( index ) {
					
					var option_value = $(this).val();
					
					obj_Modale_Body
						.append("<div value=\"" + option_value + "\">" +
								($(this).val() == this_option_selected.val() ? "<i class=\"fa fa-caret-right\"></i> " : "") + $(this).text() + 
								"</div>");

				});
			
			//Bind del click sui valori
			obj_Modale_Body.find("div").click(function(e) {

				//cambia il valore del select hidden ( .val() non funziona )
				this_select.find("option").removeAttr("selected");
				this_select.find("option[value='" + $(this).attr("value") + "']").attr("selected", "selected");
				this_select.change();
				
				//cambia il testo nell'impostor
				obj_Modale_Pulsante.html($(this).text() + " <i class=\"fa fa-caret-down\"></i>");
				
				//chiude l'impostor
				obj_Modale.css("visibility", "hidden");
				obj_Modale_Sfondo.fadeOut();
				
            });
				
		});
		
		//==================================================================

		//chiude la finestra modale
		obj_Modale_Annulla.click(function(e) {

			obj_Modale.css("visibility", "hidden");
			obj_Modale_Sfondo.fadeOut();

		});

		//==================================================================

		return this;

		//==================================================================

	}

})( jQuery );