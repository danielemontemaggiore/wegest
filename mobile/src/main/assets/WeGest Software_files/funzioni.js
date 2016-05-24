/*----------------------------------------------------------------------*/
/************************* VARIE *************************/
/*----------------------------------------------------------------------*/

	function ByRef(br_val)
	{
		this.value = br_val;
	}

/*----------------------------------------------------------------------*/

	function pollici_schermo() {
		
		var dpi_x = document.getElementById('dpi').offsetWidth;
		var dpi_y = document.getElementById('dpi').offsetHeight;

		var width = screen.width / dpi_x;
		var height = screen.height / dpi_y;
		
//		alert( width + " " + height + " " + Math.pow(width,2).toFixed(3) + " " + Math.pow(height,2).toFixed(3) );
//		alert( Math.sqrt( Math.pow(width,2) + Math.pow(height,2) ).toFixed(1) );
		return Math.sqrt( Math.pow(width,2) + Math.pow(height,2) ).toFixed(1);
	}

/*----------------------------------------------------------------------*/

    function getDensityDirectoryName() {

	  if(!window.devicePixelRatio) {
          return 'mdpi';
      }

      if(window.devicePixelRatio > 1.5) {
          return 'xhdpi';
      } else if(window.devicePixelRatio > 1.0) {
          return 'hdpi';
      }

      return 'mdpi';
    }

/*----------------------------------------------------------------------*/

	function pixel() {
		
		return "<img src=\"template/pixel.gif\" alt=\"\" style=\"width:1px; height:1px;\" />";
		
	}

/*----------------------------------------------------------------------*/

    String.prototype.hexDecode = function(){

		var r='';

		for(var i=0;i<this.length;i+=2){
			r+=unescape('%'+this.substr(i,2));
		}
		return r;

	}

/*----------------------------------------------------------------------*/

    String.prototype.hexEncode = function(){

		var r='';
		var i=0;
		var h;

		while(i<this.length){
			h=this.charCodeAt(i++).toString(16);
			while(h.length<2){
				h=h;
			}
			r+=h;
		}
		return r;
		
	}

/*----------------------------------------------------------------------*/

jQuery.fn.extend({
	insertAtCaret: function(myValue){
	  return this.each(function(i) {
		if (document.selection) {
		  //For browsers like Internet Explorer
		  this.focus();
		  var sel = document.selection.createRange();
		  sel.text = myValue;
		  this.focus();
		}
		else if (this.selectionStart || this.selectionStart == '0') {
		  //For browsers like Firefox and Webkit based
		  var startPos = this.selectionStart;
		  var endPos = this.selectionEnd;
		  var scrollTop = this.scrollTop;
		  this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
		  this.focus();
		  this.selectionStart = startPos + myValue.length;
		  this.selectionEnd = startPos + myValue.length;
		  this.scrollTop = scrollTop;
		} 
		else {
		  this.value += myValue;
		  this.focus();
		}
	  });
	}
});

/*----------------------------------------------------------------------*/

	function getMinutesBetweenDates(startDate, endDate) {

		var diff = endDate.getTime() - startDate.getTime();

		return Math.round(diff / 60000);

	}				

/*----------------------------------------------------------------------*/
	
	//converte da formato numerico europeo a javascript e viceversa
	function EUJSConverter(input) {

		return input.toString().replace(/[,.]/g, function (x) { return x == "," ? "." : ","; });
	
	}

/*----------------------------------------------------------------------*/

	function solo_valori_numerici(id_campo) {
		
		$(id_campo).keydown(function(event) {
			// Allow: backspace, delete, tab, escape, and enter
			if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
				 // Allow: Ctrl+A
				(event.keyCode == 65 && event.ctrlKey === true) || 
				 // Allow: home, end, left, right
				(event.keyCode >= 35 && event.keyCode <= 39)) {
					 // let it happen, don't do anything
					 return;
			}
			else {
				// Ensure that it is a number and stop the keypress
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
					event.preventDefault(); 
				}   
			}
		});
	
	}

/*----------------------------------------------------------------------*/
	
	function input_solo_numeri_virgola_mobile(obj_input) {

		obj_input.keydown(function(event) {

			if (
				//backspace, delete, tab, escape
				event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
				//enter
				event.keyCode == 13 || 
				//Ctrl+A
				(event.keyCode == 65 && event.ctrlKey === true) || 
				//home, end, left, right
				(event.keyCode >= 35 && event.keyCode <= 39)
				) {
					 // let it happen, don't do anything
					 return;
			}
			else {
				// Ensure that it is a number and stop the keypress
				if (event.shiftKey || event.keyCode == 44 || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
					event.preventDefault(); 
				}   
			}
		});
		
	}

/*----------------------------------------------------------------------*/
	
	function input_validate(obj_input) {
		
		var valore_input_precedente = obj_input.val();

		obj_input.on('change keyup', function(event) {

			if ( !event.target.validity.valid ) {
				obj_input.val( valore_input_precedente ); 
			} 
			else {
				valore_input_precedente = obj_input.val();
			}

		});
		
	}
		
/*----------------------------------------------------------------------*/

//	function form_provincia(path_id_provincia, path_comune, id_database_comune, prefisso_comune) {
	function form_provincia(path, name_provincia, name_comune, id_database_comune, prefisso_comune) {
	
		var select_provincia		= $(path + " select[name='" + name_provincia + "']");
		var provincia_selezionata	= select_provincia.val();
		//alert(path + " select[name='" + name_provincia + "']");
		//alert(provincia_selezionata)
		
		var comune;
		var comune_messaggio		= $(path + " ." + prefisso_comune + "_messaggio");
		var comune_box				= $(path + " ." + prefisso_comune + "_box");
		
		select_provincia.chosen({width: "200px", allow_single_deselect: true});
		select_provincia.trigger("chosen:updated");
		select_provincia.chosen().change(function(e) {
			comune_box.html("Selezionare prima una provincia");
		});
		
		
		//alert(path + " ." + prefisso_comune + "_messaggio")
		
		if (provincia_selezionata == '0') {
			comune_messaggio.html("Selezionare prima una provincia").show();
			comune_box.hide();
			//alert(provincia_selezionata)
		}
		
		if (id_database_comune != '' && provincia_selezionata != '0') {
			$.ajax({
			  type: "POST",
			  url: "ajax_comuni.asp",
			  contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
			  data: {'provincia' : provincia_selezionata, 'id_comune' : id_database_comune, 'nome_select_comune' : prefisso_comune},
			  success: function(msg){
				//alert(msg);
				if(msg == "errore") {
					//alert("E' avvenuto un errore nell'invio dei dati.");
				}
				else {
				  comune_box.html(msg);
				  comune_box.show();
				  comune_messaggio.hide();
				  comune = $(path + " select[name='" + name_comune + "']");
				  comune.chosen({allow_single_deselect: true});
				  comune.trigger("chosen:updated");
				}
			  },
			  error: function(xhr, status, error) {
				//alert(xhr.responseText);
			  }
			});
		}
		
		select_provincia.change(function() {
			
			provincia_selezionata = select_provincia.val();
			if (provincia_selezionata == '0') {
				comune_messaggio.html("Selezionare prima una provincia").show();
				comune_box.hide();
				//alert("zero")
			}
			else {
				//alert(provincia_selezionata)
				$.ajax({
				  type: "POST",
				  url: "ajax_comuni.asp",
				  contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
				  data: {'provincia' : provincia_selezionata, 'id_comune' : id_database_comune, 'nome_select_comune' : prefisso_comune},
				  success: function(msg){
					//alert(msg);
					if(msg == "errore") {
						//alert("E' avvenuto un errore nell'invio dei dati.");
					}
					else {
					  comune_box.html(msg).show();
					  comune_messaggio.hide();
					  comune = $(path + " select[name='" + name_comune + "']");
					  comune.chosen({allow_single_deselect: true});
					  comune.trigger("chosen:updated");
					}
				  },
				  error: function(xhr, status, error) {
					//alert(xhr.responseText);
				  }
				});
			}
	
		});
	}

/*----------------------------------------------------------------------*/

	function GetURLParameter(sParam) {
	
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) 
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) 
			{
				return sParameterName[1];
			}
		}
	
	}
/*----------------------------------------------------------------------*/

function VarSet(varString, newValue) {
  eval(varString + " = " + newValue);
}
	
/*----------------------------------------------------------------------*/

	function Select_HTML_da_JSON(shj_json, shj_valore_selezionato, shj_option, shj_value, shj_name_select) {
	//shj_json deve essere già elaborata con parseJSON
	//value ed option possono corrispondere, ma per flessibilità li lascio separati
	
		var shj_output;
		
		shj_output = "<select name=\"" + shj_name_select + "\">";
		
		for(var i = 0; i < shj_json.length; i++){
			shj_output += "<option value=\"" + shj_json[i][shj_value] + "\"";

			if (String(shj_valore_selezionato) == String(shj_json[i][shj_value])) {
				shj_output += " selected=\"selected\"";
			}

			shj_output += ">" + shj_json[i][shj_option] + "</option>"
		}
		
		shj_output += "</select>";
		
		return shj_output;
	}


/*----------------------------------------------------------------------*/
/************************* VARIE *************************/
/*----------------------------------------------------------------------*/

	function login_esegui() {

			$.ajax({
				url: dominio + "login_punto_ajax.asp?piattaforma=" + piattaforma,
				contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
			    type: "POST",
				data: $("#pannello_login .pannello_login_form").serialize(), 
				dataType: "text",
				success: function(data) {
					var login = $.parseJSON(data);
						if ( login.Risposta == "Errore") {
						//dati errati
							$( "#pannello_login .pannello_login_scorrevole_status" ).html( login.Testo_errore ).css('background-color','#C00');
							return false
						} 
						else {
						//dati corretti
							id_attivita		= login.ID_attivita;
							id_punto		= login.ID_punto;
							id_operatore	= login.ID_operatore;
							id_culture		= login.Culture.ID_culture;
							a1				= login.a1;
							a2				= login.a2;
							a3				= login.a3;
							a4				= login.a4;
							Culture			= login.Culture;
							Scadenza		= login.Scadenza;
							$("#pannello_login input[type='button']").hide();
							$( "#pannello_login .pannello_login_scorrevole_status" ).html( "Accesso in corso" ).css('background-color','#090');
							
							carica_pannelli( login.File, 0);
							$(".pannello_login_immagini").backstretch("destroy", true);
							
							if (piattaforma == "desktop") {
								
								//comunica le impostazioni di rete al server remoto
								Handshake_print_server( id_punto );
								
							}
						}

				},
				error: function (xhr, ajaxOptions, thrownError) {
 					$("#pannello_login input[type='button']").show();
					//alert(xhr.status);
					//alert("login errore " + xhr.responseText);
					//alert(thrownError);
				}
			});
	}

/*----------------------------------------------------------------------*/

	function login2_esegui(le_form, le_button, le_status, le_spinner, le_login_in_corso) {
			
			//aggiorna l'interfaccia
			le_button.hide();
			le_spinner.show();
			
			$.ajax({
				url: dominio + "login_punto_ajax.asp?piattaforma=" + piattaforma,
				contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
			    type: "POST",
				data: le_form.serialize(), 
				dataType: "text",
				success: function(data) {
					var login = $.parseJSON(data);
						if ( login.Risposta == "Errore") {
						//dati errati
							le_status.html( login.Testo_errore ).css({"background-color":"#C00", "color":"#FFF"}).show();
							
		 					le_button.show();
							le_spinner.hide();

							le_login_in_corso.value = false;
							
							return false
						} 
						else {
						//dati corretti
							le_login_in_corso.value = true;

							id_attivita		= login.ID_attivita;
							id_punto		= login.ID_punto;
							id_operatore	= login.ID_operatore;
							id_culture		= login.Culture.ID_culture;
							a1				= login.a1;
							a2				= login.a2;
							a3				= login.a3;
							a4				= login.a4;
							Culture			= login.Culture;
							Scadenza		= login.Scadenza;
							
							le_status.html( "Accesso in corso" ).css({"background-color":"#090", "color":"#FFF"});
							
							carica_pannelli2( login.File, 0);
							
							if (piattaforma == "desktop") {
								
								//comunica le impostazioni di rete al server remoto
								Handshake_print_server( id_punto );
								
							}
			
						}
						
				},
				error: function (xhr, ajaxOptions, thrownError) {
 					le_button.show();
					le_spinner.hide();
					
					le_login_in_corso.value = false;
				}
			});
	}

/*----------------------------------------------------------------------*/

	function stringa_url() {
		
		return "id_attivita=" + id_attivita + 
				"&id_punto=" + id_punto + 
				"&id_operatore=" + id_operatore + 
				"&id_culture=" + id_culture + 
				"&a1=" + a1 + "&a2=" + a2 + "&a3=" + a3 + "&a4=" + a4;
		
	}

/*----------------------------------------------------------------------*/

function dateAdd(date, interval, units) {
  var ret = new Date(date);
  switch(interval) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}

/*----------------------------------------------------------------------*/

function convertHex(hex, opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

/*----------------------------------------------------------------------*/
