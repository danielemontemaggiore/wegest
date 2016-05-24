"use strict";
(function( $ ) {

	$.fn.Binary_select_button = function() {

		//==================================================================
		
		var obj_select		= this;
		var valore_positivo	= "si";
		var valore_negativo	= "no";
		
		var obj_This_select;
		var obj_Impostor;
		var select_Valore;
		var select_Testo;
		var select_Name;

		//==================================================================
		
		obj_select.each(function(index, element) {
			
			obj_This_select	= $(this);
			
			select_Valore	= obj_This_select.val();
			select_Testo	= obj_This_select.find("option:selected").text();
			select_Name		= obj_This_select.attr("name");
			
			if (obj_This_select.attr("binary-select") != "done") {
			
				obj_This_select
					//genera il placeholder
					.after(
						"<div " +
							"class=\"select_switch " + (select_Valore == valore_positivo ? "positivo" : "negativo") + "\" " +		
							"name=\"" + select_Name + "\" " +
							"value=\"" + select_Testo + "\">" + 
							"<div class=\"testo\"><i class=\"fa fa-" + (select_Valore == valore_positivo ? "check-" : "") + "square-o\"></i> " + select_Testo.toUpperCase() + "</div>" + 
							"<div style=\"clear:both;\"></div>" + 
						"</div> "
					)
					//bind del cambio di valore del select
					.change(function() {
						//se si cambia il valore del select aggiorna l'impostor
						if ($(this).find("option:selected").text() == valore_positivo) {
							$(this)
								.next(".select_switch[name=" + $(this).attr("name") + "]")
								.removeClass("negativo").addClass("positivo")
								.find(".testo").html("<i class=\"fa fa-check-square-o\"></i> " + valore_positivo.toUpperCase());
						}
						else {
							$(this)
								.next(".select_switch[name=" + $(this).attr("name") + "]")
								.removeClass("positivo").addClass("negativo")
								.find(".testo").html("<i class=\"fa fa-square-o\"></i> " + valore_negativo.toUpperCase());
						}
					})
					//imposta come completato
					.attr("binary-select", "done")
					//nasconde il select
					.hide();
				
				//associa l'impostor
				obj_This_select.next(".select_switch[name='" + select_Name + "']").click(function(e) {
					
					if ( $(this).hasClass("positivo") ) {
						//cambia il placeholder
						$(this)
							.removeClass("positivo").addClass("negativo")
							.find(".testo").html("<i class=\"fa fa-square-o\"></i> " + valore_negativo.toUpperCase());
						//cambia il valore del select
						$(this).prev("select[name=" + $(this).attr("name") + "]").val(valore_negativo);
					} 
					else {
						//cambia il placeholder
						$(this)
							.removeClass("negativo").addClass("positivo")
							.find(".testo").html("<i class=\"fa fa-check-square-o\"></i> " + valore_positivo.toUpperCase());
						//cambia il valore del select
						$(this).prev("select[name=" + $(this).attr("name") + "]").val(valore_positivo);
					}
	
				});
			
			}//if done
			else {
			//se è già stato generato l'impostor, aggiorna solo il valore
				if (select_Testo == valore_positivo) {
					obj_This_select.next(".select_switch[name='" + select_Name + "']")
						.removeClass("negativo").addClass("positivo")
						.find(".testo").html("<i class=\"fa fa-check-square-o\"></i> " + valore_positivo.toUpperCase());
				}
				else {
					obj_This_select.next(".select_switch[name='" + select_Name + "']")
						.removeClass("positivo").addClass("negativo")
						.find(".testo").html("<i class=\"fa fa-square-o\"></i> " + valore_negativo.toUpperCase());
				}
				
			}//if done
			
		//==================================================================

		return this;

		//==================================================================
		
		});
	}

})( jQuery );