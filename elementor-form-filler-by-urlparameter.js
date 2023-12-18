document.addEventListener('DOMContentLoaded', function () {
// Função para obter parâmetros da URL
function getParameterByName(name, url) {
	if (!url) { url = window.location.href; }
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
	if (!results) { return null; }
	if (!results[2]) { return ''; }
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Função para preencher automaticamente os campos do formulário
function populateFormFields() {
	//Cria a variavel do formulário e atribui o formulário do elementor a ela (Um formulário por página)
	var form = document.querySelector('.elementor-form');
	
	//Verifica se o formulário foi encontrado, caso contrário interrompe o código
	if(form == null) {return;}
	//Cria dois arrays, um para os campos type select e outra para o restante
	var fields = form.querySelectorAll('.elementor-field-group:not(.elementor-field-type-select) .elementor-field-textual');
	var fieldsSelect = form.querySelectorAll('.elementor-field-group.elementor-field-type-select .elementor-field-textual');

	//Cria a lista de valores
	var values = [];
		
	//Adiciona na lista os valores dos parametros, exceto type select
	for (var i = 0; i < fields.length; i++) {
		values.push(getParameterByName(removeFormFieldPrefix(fields[i].id)));
			
		var input = form.querySelector(addHashToStart(fields[i].id));
					
		//Popula o campo do formulário com o valor do parametro armazenado na lista (Caso houver)
		if(input && values[i] != null){
			input.value = values[i];
		}
	}
		
		//Adiciona na lista os valores dos parametros type select
	for (i = i; i < fields.length + fieldsSelect.length; i++) {
		values.push(getParameterByName(removeFormFieldPrefix(fieldsSelect[i -fields.length].id)));
			
		var str = addHashToStart(fieldsSelect[i -fields.length].id);
		var seletor = form.querySelector(str);
			
		//Seleciona o conteudo de acordo com a posição passada pelo parametro, que esta na lista
        	if (seletor && values[i] != null) {
			if(values[i] < 0 || values[i] >= seletor.options.length) {return; }
			seletor.selectedIndex = values[i];
        	}				
	}
}

//Remove o prefixo: 'form-field-' da string (Caso a string tenha o prefixo)
function removeFormFieldPrefix(str) {
	var prefix = 'form-field-';
	if (str.startsWith(prefix)) {
    		str = str.substring(prefix.length);
	}
	return str;
}

//Adiciona o prefixo '#' na string
function addHashToStart(str) {
	var hash = '#';
	str = hash.concat(str);
	return str;
}

// Chamar a função quando a página estiver carregada
populateFormFields();
});
