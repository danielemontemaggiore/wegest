/*----------------------------------------------------------------------*/

 var obj_window;
 var obj_window_altezza;
 var obj_window_larghezza;
 var box_wrapper;
 var box_wrapper_altezza;
 var box_wrapper_larghezza;
 var box_pannelli;
 var box_menu;

/*----------------------------------------------------------------------*/

function ReLayout() {

	 //window
	obj_window = $(window);
	obj_window_altezza = obj_window.height();
	obj_window_larghezza = obj_window.width();
	//alert(obj_window.height())
	 
	//wrapper
	box_wrapper = $("#wrapper");
	box_wrapper.outerHeight( obj_window_altezza );
	box_wrapper.outerWidth( obj_window_larghezza );
	box_wrapper_altezza = obj_window_altezza;
	box_wrapper_larghezza = obj_window_larghezza;
	 
	//pannelli
	box_pannelli = $(".pannello");
	box_pannelli.outerHeight( box_wrapper_altezza );
	box_pannelli.each(function(index, element) {
		if ($(this).attr("relayout") != "no") {
			$(this).outerWidth( box_wrapper_larghezza );
		}
	});
	
	$(".pannello_interno").css('max-height', (box_wrapper_altezza - parseInt($(".pannello_interno").css('margin-top'))) + "px");

	//menu
	box_menu = $("#menu");
	box_menu.outerHeight( box_wrapper_altezza );
	//alert(box_wrapper_altezza)
	
}

/*----------------------------------------------------------------------*/

$(function() {

	//pulsante di chiusura del programma
	$("#pulsante_chiudi").click(function(e) {
		Chiudi_programma();
	});

	//pulsante per minimizzare il programma
	$("#pulsante_minimizza").click(function(e) {
		Minimizza_finestra();
	});

	//pulsante per massimizzare la finestra
	$("#pulsante_massimizza").click(function(e) {
		Massimizza_finestra();
		$(this).hide();
		$("#pulsante_normale").show();
	});

	//pulsante per riportare a normale la dinestra
	$("#pulsante_normale").click(function(e) {
		Normale_finestra();
		$(this).hide();
		$("#pulsante_massimizza").show();
	});
	
	//pulsante impostazioni
	$("#pulsante_impostazioni").click(function(e) {
		$("#menu .pulsante_menu").removeClass("selezionato");
		box_pannelli.hide();
		$( "#pannello_impostazioni" ).show();
		eval( "pannello_impostazioni_inizializza()" );
	});

	$(window).resize(function() {
		ReLayout();
	});

});

/*----------------------------------------------------------------------*/

	function carica_pannelli(cp_array_pannelli, cp_indice) {
		
		var numero_pannelli = cp_array_pannelli.length;

		if (cp_indice < numero_pannelli) {
			$.each(cp_array_pannelli[cp_indice], function(key, value) {

				$.get(dominio + value, function (pannello) {
					box_wrapper.append(pannello);
					$("#bip").html(key);
					carica_pannelli(cp_array_pannelli, cp_indice + 1);
				});

			});
		}
		else {
			ReLayout();
			$( "#pannello_dashboard" ).show();
			$( "#pannello_menu" ).show();
			pannello_dashboard_inizializza();
			
			//fa sparire il pannello di login
			$("#pannello_login").animate({'top': (obj_window_altezza +30)*-1}, 
				{
					duration:900, complete: function() {
						$(this).hide();
						$("#pulsante_impostazioni").show();
					}
				}
			);			
			
			$("input").keypress(function (e) {
				if (e.which == 13) {
					e.preventDefault();
				}
			});

			$("button").click(function(e) {
                e.preventDefault();
            });
			
		}
		
	}

/*----------------------------------------------------------------------*/

	function carica_pannelli2(cp_array_pannelli, cp_indice) {
		
		var numero_pannelli = cp_array_pannelli.length;

		if (cp_indice < numero_pannelli) {
			$.each(cp_array_pannelli[cp_indice], function(key, value) {

				$.get(dominio + value, function (pannello) {
					box_wrapper.append(pannello);
					$("#pannello_login .avanzamento").html(key);
					carica_pannelli2(cp_array_pannelli, cp_indice + 1);
				});

			});
		}
		else {
			ReLayout();
			$( "#pannello_dashboard" ).show();
			$( "#pannello_menu" ).show();
			pannello_dashboard_inizializza();
			
			//fa sparire il pannello di login
			$("#pannello_login").animate({'top': (obj_window_altezza +30)*-1}, 
				{
					duration:900, complete: function() {
						$(this).hide();
						$("#pulsante_impostazioni").show();
					}
				}
			);			
			
			$("input").keypress(function (e) {
				if (e.which == 13) {
					e.preventDefault();
				}
			});
			
			$("button").click(function(e) {
                e.preventDefault();
            });
			
		}
		
	}

/*----------------------------------------------------------------------*/
