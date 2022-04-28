const pacotes = [
	'288355555123888',
	'335333555584333',
	'223343555124001',
	'002111555874555',
	'111188555654777',
	'111333555123333',
	'432055555123888',
	'079333555584333',
	'155333555124001',
	'333188555584333',
	'555288555123001',
	'111388555123555',
	'288000555367333',
	'066311555874001',
	'110333555123555',
	'333488555584333',
	'455448555123001',
	'022388555123555',
	'432044555845333',
	'034311555874001'
]

const regioes = [
	'Centro-Oeste',
	'Nordeste',
	'Norte',
	'Sudeste',
	'Sul'
]

const endereco = (codigo) => {
	if (codigo >= 1 && codigo <= 99) return `Cidade ${codigo}, região Sudeste`
	if (codigo >= 100 && codigo <= 199) return `Cidade ${codigo}, região Sul`	
	if (codigo >= 201 && codigo <= 299) return `Cidade ${codigo}, região Centro-Oeste`
	if (codigo >= 300 && codigo <= 399) return `Cidade ${codigo}, região Nordeste`
	if (codigo >= 400 && codigo <= 499) return `Cidade ${codigo}, região Norte`

	return 'ND'
}

const produto = (codigo) => (
	{
		'001': 'Jóias',
		'111': 'Livros',
		'333': 'Eletrônicos',
		'555': 'Bebidas',
		'888': 'Brinquedos'
	}[codigo] || 'ND'
)

const blackList = (codigo) => (
	[
		'367'
	].indexOf(codigo) == -1 ? codigo : 'ND'
)

const trinca = (pacote) => {
	const [
		origem,
		destino,
		loggi,
		vendedor,
		sku
	] = pacote.match(/(\d{3})/g)

	return {
		'Código': pacote,
		'Região de origem': endereco(origem),
		'Região de destino': endereco(destino),
		'Código Loggi': loggi,
		'Código do vendedor do produto': blackList(vendedor),
		'Tipo do produto': produto(sku)
	}
}

const data = pacotes.map(trinca)

console.group('1. Identificar a região de destino de cada pacote, com totalização de pacotes (soma região)')
console.table(
	regioes
		.map(regiao => data.filter(pacote => pacote['Região de destino'].endsWith(regiao)))
		.map(pacotes => pacotes.length)
		.reduce((o, length, i) => (o[regioes[i]] = length, o), {})
)
console.groupEnd()

console.group('2. Saber quais pacotes possuem códigos de barras válidos e/ou inválidos;')
console.table(
	{
		'Pacotes válidos': data.filter(pacote => !/ND/g.test(JSON.stringify(pacote))).length,
		'Pacotes inválidos': data.filter(pacote => /ND/g.test(JSON.stringify(pacote))).length
	}
)
console.groupEnd()

console.group('3. Identificar os pacotes que têm como origem a região Sul e Brinquedos em seu conteúdo;')
console.table(
	data
		.filter(pacote => pacote['Região de origem'].endsWith('Sul'))
		.filter(pacote => pacote['Tipo do produto'].endsWith('Brinquedos'))
)
console.groupEnd()

console.group('4. Listar os pacotes agrupados por região de destino (Considere apenas pacotes válidos);')
console.log('Não processado')
console.groupEnd()

console.group('5. Listar o número de pacotes enviados por cada vendedor (Considere apenas pacotes válidos);')
console.log('Não processado')
console.groupEnd()

console.group('6. Gerar o relatório/lista de pacotes por destino e por tipo (Considere apenas pacotes válidos);')
console.log('Não processado')
console.groupEnd()

console.group('7. Se o transporte dos pacotes para o Norte passa pela Região Centro-Oeste, quais são os pacotes que devem ser despachados no mesmo caminhão?')
console.log('Não processado')
console.groupEnd()

console.group('8. Se todos os pacotes fossem uma fila qual seria a ordem de carga para o Norte no caminhão para descarregar os pacotes da Região Centro Oeste primeiro;')
console.log('Não processado')
console.groupEnd()

console.group('9. No item acima considerar que as jóias fossem sempre as primeiras a serem descarregadas;')
console.log('Não processado')
console.groupEnd()

console.group('10. Listar os pacotes inválidos.')
console.table(
	data.filter(pacote => /ND/g.test(JSON.stringify(pacote)))
)
console.groupEnd()

console.group('**. Todos os pacotes.')
console.table(data)
console.groupEnd()