	function checkRutGenerico(campo, isEmpresa, svalor)
	{
		console.log(campo.id)
			var btnSbmt =$(campo).attr('data-submit')
			var tmpstr = "";
			var rut = campo.value;
			var i=0;
			var largo=0;
			var rutMax=rut;
			var j=0;
			var cnt=0;
			var dv="";
			var suma=0;
			var mul=0;
			var res=0;
			var dvi;

			
			if(campo.length == 0 || rut ==0) 
				return false;
			
			for ( i=0; i < rut.length ; i++ )
				if ( rut.charAt(i) != ' ' && rut.charAt(i) != '.' && rut.charAt(i) != '-' )
					tmpstr = tmpstr + rut.charAt(i);
			rut = tmpstr;
			largo = rut.length;
			tmpstr = "";
			for ( i=0; rut.charAt(i) == '0' ; i++ );
				for (; i < rut.length ; i++ )
					tmpstr = tmpstr + rut.charAt(i);
			rut = tmpstr;
			largo = rut.length;
			
			if ( largo < 2 )
			{
				document.getElementById(btnSbmt).disabled="true";
				toastr.error('', 'Debe ingresar el RUT completo.', {timeOut: 5000})
				return false;
			}
			for (i=0; i < largo ; i++ )
			{
				if( (rut.charAt(i) != '0') && (rut.charAt(i) != '1') && (rut.charAt(i) !='2') && (rut.charAt(i) != '3') && (rut.charAt(i) != '4') && (rut.charAt(i) !='5') && (rut.charAt(i) != '6') && (rut.charAt(i) != '7') && (rut.charAt(i) != '8') && (rut.charAt(i) != '9') && (rut.charAt(i) !='k') && (rut.charAt(i) != 'K') )
				{
					document.getElementById(btnSbmt).disabled="true";
					 toastr.error('', 'Rut Incorrecto', {timeOut: 5000})
					 $('#'+campo.id).addClass('is-invalid');
					return false;
				}
			}

			tmpstr="";
			for ( i=0; i < rutMax.length ; i++ )
				if ( rutMax.charAt(i) != ' ' && rutMax.charAt(i) != '.' && rutMax.charAt(i) != '-' )
				  tmpstr = tmpstr + rutMax.charAt(i);
			tmpstr = tmpstr.substring(0, tmpstr.length - 1);
			if ( (!(tmpstr < 50000000)) && (!isEmpresa) )
			{	
				document.getElementById(btnSbmt).disabled="true";
				toastr.error('', 'Rut Incorrecto', {timeOut: 5000})
				$('#'+campo.id).addClass('is-invalid');
				return false;
			}
			
			var invertido = "";
			for ( i=(largo-1),j=0; i>=0; i--,j++ )
				invertido = invertido + rut.charAt(i);
			var drut = "";
			drut = drut + invertido.charAt(0);
			drut = drut + '-';
			cnt = 0;
			for ( i=1,j=2; i<largo; i++,j++ )
			{
				if ( cnt == 3 )
				{
					drut = drut + '.';
					j++;
					drut = drut + invertido.charAt(i);
					cnt = 1;
				}
				else
				{
					drut = drut + invertido.charAt(i);
					cnt++;
				}
			}
			invertido = "";
			for ( i=(drut.length-1),j=0; i>=0; i--,j++ )
			{
				if (drut.charAt(i)=='k')
					invertido = invertido + 'K';
				else
					invertido = invertido + drut.charAt(i);
			}
			
			//VALIDACION PARA ASIGNAR FORMATO A CAJA DE TEXTO DE RUT ACTIVO 
			switch(svalor) 
			{
				case 1:
				    document.getElementById("CustPermIDAux").value = invertido;
				    break;
				case 2:				
				    document.getElementById(campo.id).value = invertido;
				    break;
			}//FIN INSTRUCCION
			
			if (!checkDV(rut))
			{
				toastr.error('', 'Rut Incorrecto', {timeOut: 5000})
	          	document.getElementById(btnSbmt).disabled="true";
	          	$('#'+campo.id).addClass('is-invalid');
				return false;
			}
				wa = rut;
			   let value = wa.replace(/\./g, '').replace('-', '');
  				
		          if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
		            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
		          }
		          else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
		            value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
		          }
		          else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
		            value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
		          }
		          else if (value.match(/^(\d)(\d{0,2})$/)) {
		            value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
		          }
			var posting = $.post( base_url + "wood/trabajadores/rut_existe",{rut : value});
		        posting.done(function( data ) {
		            if(data.trim() == 'no'){
		            	toastr.success("Rut correcto");
		            	document.getElementById(btnSbmt).removeAttribute('disabled');;
		            	console.log('no')
		            }
		            if(data.trim() == 'si'){
		            	toastr.error("El rut ya se encuentra registrado");
		            	document.getElementById(btnSbmt).disabled="true";
		            	console.log('si')
		            }
		            if(data.trim() == 'vacio'){
		            	toastr.error("El campo esta vacio!!");
		            }
		        });

			return true;
	}

	function checkDV(crut)
	{
		var largo = 0;
		var dv ="";
		var rut="";
		var suma=0;
		var mul=0;
		var res=0;
		var dvr = '0';
		var dvi=0;
		var i=0;
		
		largo = crut.length;
		if(largo < 2){
			return false;
		}
		if(largo > 2){
			rut = crut.substring(0, largo - 1);
		}else{
			rut = crut.charAt(0);
		}

		var dv = crut.charAt(largo-1);

		if(!checkCDV(dv))
			return false;

		if(rut == null || dv == null){
			return false;
		}

		suma = 0;
		mul  = 2;
		for (i= rut.length -1 ; i >= 0; i--)
		{
			suma = suma + rut.charAt(i) * mul;
			if(mul == 7){
				mul = 2;
			}
			else{
				mul++;
			}
		}
		res = suma % 11;
		if (res==1)
		{
			dvr = 'k';
		}
		else
		{
			if(res==0){
			  dvr = '0';
			}
			else
			{
			  dvi = 11-res;
			  dvr = dvi + "";
			}
		}

		if(dvr != dv.toLowerCase())
		{
			return false;
		}
		return true;
	}

	function checkCDV(dvr)
	{
		var dv="";
		
		dv = dvr + "";
		if(dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')
		{
			return false;
		}
		return true;
	}

	function soloRUT(e)
	{
			var tecla = (document.all) ? event.keyCode : e.which;
			
			if(tecla==8) return true;

			var patron =/^[0-9kK]+$/;  //acepta valores alfanumericos	
			var te = String.fromCharCode(tecla);

			if(!patron.test(te) && tecla==0){
				return true;
			}
			
			return patron.test(te);
	}

	function soloLetrasYNum(e)
	{
		var tecla = (document.all) ? event.keyCode : e.which;
		
		if(tecla==8) return true;

		var patron =/^[0-9A-Za-z]+$/;  //acepta valores alfanumericos
		var te = String.fromCharCode(tecla);
		
		if(!patron.test(te) && tecla==0){
			return true;
		}
			return patron.test(te);
		
	}

	

function limpiaPuntoGuion(svalor,num) {
    var valCheck;
	var obj;
	    obj = document.getElementById(svalor.id).value;
		obj = obj.replace(".","");
	    obj = obj.replace(".","");
		obj = obj.replace(/-/,"");
		document.getElementById(svalor.id).value = obj;
}//FIN INSTRUCCION

