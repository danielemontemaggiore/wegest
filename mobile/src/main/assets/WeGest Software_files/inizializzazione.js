/*----------------------------------------------------------------------*/

	piattaforma 	= GetURLParameter("piattaforma");

	versione 	= parseInt(GetURLParameter("v"));
	
/*----------------------------------------------------------------------*/

//	dominio			= "http://www.we-gest.com/";
	dominio			= "http://www.i-salon.eu/";
	
/*----------------------------------------------------------------------*/

	ajax_timeout	= 6000;
	
	ajax_timeout_msg_errore	= "Tempo assegnato all'operazione scaduto: verificare la connessione e riprovare.";
	
/*----------------------------------------------------------------------*/

	//modifica per formattazione euro
	Number.prototype.formatEuro = function(c, d, t){
	var n = this, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "," : d, 
		t = t == undefined ? "." : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };

/*----------------------------------------------------------------------*/

	//serve per rendere case insensitive la ricerca
	jQuery.expr[':'].Contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

/*----------------------------------------------------------------------*/

//	$.datepicker.setDefaults( $.datepicker.regional[ "it" ] );

/*----------------------------------------------------------------------*/
	
	//imposta la lingua italiana sulla libreria moment
	moment.lang('it', {
		relativeTime : {
			future: "%s",
			past:   "%s",
			s:  "alcuni secondi",
			m:  "un minuto",
			mm: "%d minuti",
			h:  "un'ora",
			hh: "%d ore",
			d:  "un giorno",
			dd: "%d giorni",
			M:  "un mese",
			MM: "%d mesi",
			y:  "un anno",
			yy: "%d anni"
    }
	});

/*----------------------------------------------------------------------*/

	
/*----------------------------------------------------------------------*/

	$(function() {
		 
		$.datepicker.setDefaults( $.datepicker.regional[ "it" ] );
		ReLayout();
		$("#pannello_login").show();
		 
		pollici_schermo = parseInt(pollici_schermo());
		//alert(pollici_schermo);
		
		if (box_wrapper_larghezza > 1600 && box_wrapper_larghezza < 2000) {
			$("body").css("font-size","18px");
		}
		else if (box_wrapper_larghezza >= 2000) {
			$("body").css("font-size","22px");
		}
		
		$.support.cors = true;
		
	});

/*----------------------------------------------------------------------*/

//$(window).unload(function(){
//  alert('Bye.');
//});

	if (navigator.userAgent.indexOf("MSIE", 0) != -1 || navigator.userAgent.indexOf("Trident", 0) != -1 || navigator.userAgent.indexOf("Edge/", 0) != -1) {
		window.location = "browser_non_compatibile.asp";
	}
	else {
		window.onbeforeunload = function() {
			return 'Sei sicuro di voler lasciare la pagina?';
		};
	}

/*----------------------------------------------------------------------*/

ion.sound({
    sounds: [
        {
            name: "glass"
        },
		{
			name: "bell_ring"
		},
		{
			name: "computer_error"
		}
    ],
    volume: 0.5,
    path: "media/suoni/",
    preload: true
});
/*----------------------------------------------------------------------*/
