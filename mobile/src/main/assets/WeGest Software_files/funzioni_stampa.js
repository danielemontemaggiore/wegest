/*----------------------------------------------------------------------*/
	//deprecato
	function GetPrintServerIP() {
		
		CercaPrintServer(i);

	}
	
/*----------------------------------------------------------------------*/
	//deprecato
	function CercaPrintServer(ip_num) {

		url_print_server = "http://192.168.1." + ip_num + "/ip.php";
		//report.append("<div style=\"margin-top:10px;\">Richiesta a: " + url_print_server + "</div>");

		$.ajax({
			url: url_print_server,
			type: "GET",
			dataType: "text",
			timeout: 500,
			success: function(data) {
				//risposta = "<div style=\"font-weight:bold; color:green;\">" + data + "</div>";
				alert("ok " + ip_num);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (ip_num < 255) {
					//alert("no " + ip_num);
					ip_num++;
					CercaPrintServer(ip_num);
				}
			}
		});

	}


	
/*----------------------------------------------------------------------*/
/*## Ricevute ##*/
/*----------------------------------------------------------------------*/

	function Stampa_ricevuta(sr_id_ricevuta, sr_ip) {
		
		var stampa_ricevute_IP, stampa_ricevute_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_ricevute_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_ricevute_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_ricevute_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_ricevute_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_ricevute_Tipo == "Windows") {
			stampa_ricevute_IP += ":8080"
		}
		
		stampa_ricevute_IP += "/?idr=" + sr_id_ricevuta + "&stampante=ricevute";
		
		$.ajax({
			url: stampa_ricevute_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});
	
	}

/*----------------------------------------------------------------------*/

	function Stampa_ricevuta_desktop(sr_id_ricevuta) {
		
		//se la variabile esiste
		if (typeof Stampante_ricevute_usa !== 'undefined') {
			if (Stampante_ricevute_usa == "True") {
				jsobject.callNET_Stampa_ricevuta(sr_id_ricevuta);
			}
		}
		
	}



/*----------------------------------------------------------------------*/
/*## Fiche ##*/
/*----------------------------------------------------------------------*/

	function Stampa_fiche_desktop(sr_id_cliente, sr_id_punto) {
		
		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_fiche(sr_id_cliente, sr_id_punto);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_fiche(sr_id_cliente, sr_id_punto, sr_ip) {

		var stampa_fiche_IP, stampa_fiche_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_fiche_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_fiche_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_fiche_Tipo == "Windows") {
			stampa_fiche_IP += ":8080"
		}
		
		stampa_fiche_IP += "/?id1=" + sr_id_cliente + "&id2=" + sr_id_punto + "&stampante=fiche";
		
		$.ajax({
			url: stampa_fiche_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

//		$.get( "http://" + sr_ip + ":8080/?id1=" + sr_id_cliente + "&id2=" + sr_id_punto + "&stampante=fiche", function() {
//			//alert( "in stampa" + sr_ip);
//		})

	}



/*----------------------------------------------------------------------*/
/*## Voucher ##*/
/*----------------------------------------------------------------------*/

	function Stampa_voucher_desktop(sv_id_cliente, sv_id_punto, sv_id_voucher) {
		
		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_voucher(sv_id_cliente, sv_id_punto, sv_id_voucher);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_voucher(sv_id_cliente, sv_id_punto, sv_id_voucher, sr_ip) {

		var stampa_voucher_IP, stampa_vouchere_Tipo
		
		//alert(sv_id_cliente + " " + sv_id_punto + " " + sv_id_voucher + " " + sr_ip)
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_voucher_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_voucher_Tipo		= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_voucher_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_voucher_Tipo		= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_voucher_Tipo == "Windows") {
			stampa_voucher_IP += ":8080"
		}
		
		stampa_voucher_IP += "/?id1=" + sv_id_cliente + "&id2=" + sv_id_punto + "&id3=" + sv_id_voucher + "&stampante=voucher";

		$.ajax({
			url: stampa_voucher_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

//		$.get( "http://" + sr_ip + ":8080/?id1=" + sr_id_cliente + "&id2=" + sr_id_punto + "&stampante=voucher", function() {
//			//alert( "in stampa" + sr_ip);
//		})

	}



/*----------------------------------------------------------------------*/
/*## Preconto ##*/
/*----------------------------------------------------------------------*/

	function Stampa_preconto_desktop(sp_id_cliente, sp_id_punto, sp_id_movimento) {
		
		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_preconto(sp_id_cliente, sp_id_punto, sp_id_movimento);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_preconto(sp_id_cliente, sp_id_punto, sp_ip) {

		var stampa_fiche_IP, stampa_fiche_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_fiche_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_fiche_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_fiche_Tipo == "Windows") {
			stampa_fiche_IP += ":8080"
		}
		
		stampa_fiche_IP += "/?id1=" + sp_id_cliente + "&id2=" + sp_id_punto + "&stampante=preconto";
		
		$.ajax({
			url: stampa_fiche_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

	}



/*----------------------------------------------------------------------*/
/*## Corrispettivi ##*/
/*----------------------------------------------------------------------*/

	function Stampa_corrispettivi_desktop(sp_id_punto, sp_id_culture) {

		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_corrispettivi(sp_id_punto, sp_id_culture);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_corrispettivi(sp_id_punto, sp_id_culture, sp_ip) {

		var stampa_fiche_IP, stampa_fiche_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_fiche_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_fiche_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_fiche_Tipo == "Windows") {
			stampa_fiche_IP += ":8080"
		}
		
		stampa_fiche_IP += "/?id_punto=" + sp_id_punto + "&id_culture=" + sp_id_culture + "&stampante=corrispettivi";
		
		$.ajax({
			url: stampa_fiche_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

	}

/*----------------------------------------------------------------------*/
/*## Appuntamento ##*/
/*----------------------------------------------------------------------*/

	function Stampa_appuntamento_desktop(sp_id_punto, sp_id_appuntamento) {

		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_appuntamento(sp_id_punto, sp_id_appuntamento);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_appuntamento(sp_id_punto, sp_id_appuntamento, sp_ip) {

		var stampa_fiche_IP, stampa_fiche_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_fiche_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_fiche_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_fiche_Tipo == "Windows") {
			stampa_fiche_IP += ":8080"
		}
		
		stampa_fiche_IP += "/?id_punto=" + sp_id_punto + "&id_appuntamento=" + sp_id_appuntamento + "&stampante=appuntamento";
		
		$.ajax({
			url: stampa_fiche_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

	}

/*----------------------------------------------------------------------*/
/*## Punti cliente ##*/
/*----------------------------------------------------------------------*/

	function Stampa_punti_cliente_desktop(sp_id_punto, sp_id_cliente) {

		//se la variabile esiste
		if (typeof Stampante_fiche_usa !== 'undefined') {
			if (Stampante_fiche_usa == "True") {
				jsobject.callNET_Stampa_punti_cliente(sp_id_punto, sp_id_cliente);
			}
		}
		
	}

/*----------------------------------------------------------------------*/

	function Stampa_punti_cliente(sp_id_punto, sp_id_cliente, sp_ip) {

		var stampa_fiche_IP, stampa_fiche_Tipo
		
		//seleziona l'origine dei dati
		if (stampa_impostazioni_IP_Fisso_usa) {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_Fisso;
			stampa_fiche_Tipo	= stampa_impostazioni_IP_Fisso_tipo;
		}
		else {
			stampa_fiche_IP		= "http://" + stampa_impostazioni_IP_print_server;
			stampa_fiche_Tipo	= stampa_impostazioni_Tipo_print_server;
		}
		
		//se windows, invia i dati alla porta in ascolto
		if (stampa_fiche_Tipo == "Windows") {
			stampa_fiche_IP += ":8080"
		}
		
		stampa_fiche_IP += "/?id_punto=" + sp_id_punto + "&id_cliente=" + sp_id_cliente + "&stampante=punti";
		
		$.ajax({
			url: stampa_fiche_IP,
			async:true,
			cache: false,
			type: "POST",
			timeout: 10000,
			dataType: "json"
		});

	}

/*----------------------------------------------------------------------*/
