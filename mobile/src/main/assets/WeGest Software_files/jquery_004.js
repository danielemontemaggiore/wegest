"use strict";
(function( $ ) {
	$.fn.ZSearch = function( options  ) {
	
		//==================================================================

		//opzioni di default
		 var settings = $.extend({
			wrapper: "",
			form: "",
			input: "",
			elenco: ""
		}, options );
		
		//==================================================================

		var $this				= $(this);
		var obj_wrapper			= $this.find(settings.wrapper);
		var obj_form			= $this.find(settings.form);
		var obj_input			= $this.find(settings.input);
		var obj_input_hidden	= $this.find(settings.input_hidden);
		var obj_elenco			= $this.find(settings.elenco);
		
		//==================================================================

		$(window).load(function() {
			
			//cerca
			obj_input.doneTyping({
				delay: 250, 
				success: function(val, opts) {
					ZSearch_cerca_localita();
				}
			});
			
			//focus sul campo di testo
			obj_input.focus(function(e) {
				ZSearch_cerca_localita();
			});
			
			//nasconde l'elenco se si clicca al di fuoi del campo di ricerca
			$(document).click(function(e) {
				if (!obj_input.is(e.target)) {
					obj_elenco.hide();
				}
			});
			
			//on form submit
			obj_form.submit(function(e) {
                obj_input_hidden.val( obj_input.val() );
				obj_input.val("");
            });

		});

		//==================================================================

		function ZSearch_cerca_localita() {

			if (obj_input.val() == "") {
				obj_elenco.hide();
			}
			else {
				$.ajax({
					url: "cerca_ajax.asp",
					type: "POST",
					data: obj_form.serialize(), 
					dataType: "text",
					success: function(data) {
						//alert("TEST " + data);
						if (data == '') {
						//nessun risultato
							obj_elenco.hide();
						}
						else {
						//risultati trovati
							var risultati = $.parseJSON(data);
			
							var localita_output = '';
							
							for(var i = 0; i < risultati.L.length; i++){
								if (risultati.L[i].T == "L") {
								//Locale
									localita_output += "<div class=\"riga\" id_locale=\"" + risultati.L[i].I + "\" " +
														"nome_locale=\"" + encodeURI(risultati.L[i].N) + "\" " +
														"nome_comune=\"" + encodeURI(risultati.L[i].C) + "\">" + 
														"<i class=\"fa fa-cutlery\"></i> " + risultati.L[i].N + 
														" (" + risultati.L[i].C + ")</div>"; 
								}
								else {
								//Comune
									localita_output += "<div class=\"riga\" id_comune=\"" + risultati.L[i].I + "\" " +
														"nome_comune=\"" + risultati.L[i].C.replace("\"", "") + "\" " + 
														"nome_provincia=\"" + risultati.L[i].P.replace("\"", "") + "\">" + 
														"<i class=\"fa fa-map-marker\"></i> " + risultati.L[i].C + 
														" (" + risultati.L[i].P + ")</div>"; 
								}
							}
							
							//Aggiunge le righe
							obj_elenco
								.html( localita_output )
								.show()
								.position({
									my: "left top",
									at: "left bottom",
									of: obj_wrapper
								})
								.outerWidth( obj_wrapper.outerWidth() );
							
							//Click su locale
							obj_elenco.find("div.riga[id_locale]").click(function() {
								window.location = "locale.asp?" +
													"locale=" + $(this).attr("nome_locale") + 
													"&dove=" + $(this).attr("nome_comune") + 
													"&idl=" + $(this).attr("id_locale");
							});
							
							//Click su comune
							obj_elenco.find("div.riga[id_comune]").click(function() {
								obj_input.val( $(this).attr("nome_comune") + " (" + $(this).attr("nome_provincia") + ")");
								obj_form.submit();
//								window.location = "cerca.asp?" +
//													"dove=" + $(this).attr("nome_comune") + 
//													"&idc=" + $(this).attr("id_comune");
							});
							
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
			//				alert(xhr.status);
			//				alert("clienti errore " + xhr.responseText);
			//				alert(thrownError);
					}
				});
			}
		}

		//==================================================================

	}
})( jQuery );