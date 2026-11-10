const select = document.getElementById('btn-select')
const tbody = document.getElementById('lista-tabela')

select.addEventListener('change', function(event) {

    const marca = event.target.value
    const url = `api/buscar/veiculo/?marca=${encodeURIComponent(marca)}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json' // indica ao servidor que espero json como resposta
        }
    })  
    .then(response=>{
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log("Deu certo meu")
        const veiculos = data.resultado
        console.log(veiculos)
        if(veiculos.length == 0){
            messageData(tbody)
            return
        }

        showTable(tbody, veiculos)
    })
    .catch(error => {
        console.error('Falha na comunicação AJAX:', error);
    });
});

function api(url, event){

}

function showTable(element, dados){
    tbody.textContent = ""
    const link = {
        classe: 'action-link',
        editar: {
            url: 'altVeiculo',
            svg: 'pencil.svg',
            alt: 'editar'
        },
        apagar: {
            url: 'excluir-veiculo',
            svg: 'trash.svg',
            alt: 'apagar'
        }

    }
    // Instancia o fragmento em memória
    const fragment = document.createDocumentFragment();
    
    const linhas = dados.map((v, index)=>{
        const tr = document.createElement('tr');

        const t1 = document.createElement('td');
        t1.textContent = v.placa

        const t2 = document.createElement('td');
        t2.textContent = `${v.nome_marca} ${v.modelo}`

        const t3 = document.createElement('td');
        t3.style.color = '#1550E0'
        t3.style.fontWeight = '600'
        t3.textContent = v.cliente

        const t4= document.createElement('td');
        t4.textContent = v.tipo

        const t5 = document.createElement('td')
        const div = document.createElement('div')
        div.setAttribute('class','action-registro')
        // Criando o botao para editar veiculo
        const a1 = document.createElement('a')
        a1.setAttribute('class', link.classe)
        a1.setAttribute('href',`${link.editar.url}/${v.id}`)
        const img1 = document.createElement('img')
        img1.setAttribute('src', `/static/assets/${link.editar.svg}`)
        img1.setAttribute('alt', `icone ${link.editar.alt}`)
        a1.append(img1)
        // Criando o botao para excluir veiculo
        const a2 = document.createElement('a')
        a2.setAttribute('class', link.classe)
        a2.setAttribute('href',`${link.apagar.url}/${v.id}`)
        const img2 = document.createElement('img')
        img2.setAttribute('src', `/static/assets/${link.apagar.svg}`)
        img2.setAttribute('alt', `icone ${link.apagar.alt}`)
        a2.append(img2)

        div.append(a1,a2)
        t5.append(div)
        tr.append(t1,t2,t3,t4,t5)

        return tr;
    })
    fragment.append(...linhas)
    element.appendChild(fragment)

}

function messageData(element){
    tbody.textContent = ""
    const tr = document.createElement('tr');
    tr.style.display = 'flex'
    tr.style.padding = '20px 20px'
    tr.style.justifyContent = 'center'
    tr.style.width = '100%'
    tr.setAttribute('rowspan','1')
    // Instancia o fragmento em memória
    const fragment = document.createDocumentFragment();

    const t1 = document.createElement('td');
    t1.textContent = "Nenhum dado encontrado"

    tr.appendChild(t1)
    element.appendChild(tr)
}

