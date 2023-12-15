function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function debounce(func, timeout = 300) {
    let timer;
    return (args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func(args); }, timeout);
    };
}

const addErrorVerify = (condition, id, text, input) => {
    if (document.getElementById(id)) {
        document.getElementById(id).remove()
    }
    if (condition) {
        document.getElementById("button-next-input").classList.remove("bg-custom-button")
        document.getElementById("button-next-input").disabled = true
        const span = document.createElement('span');
        span.id = id
        span.classList.add("text-red-500")
        span.innerHTML = text
        input.parentNode.insertBefore(span, input.nextSibling);
        return true
    }
    return false
}

const openModalTerms = () => {
    document.querySelector("body").style.overflow = 'hidden';
    var target = document.querySelector('#modal-cripto-na-hora');
    var div = document.createElement('div');
    div.id = "bg-modal-cripto-na-hora";
    div.className = "h-screen fixed z-50 w-screen overflow-y-auto bg-black bg-opacity-30 flex justify-center items-start";
    div.innerHTML = `
        <div id="content-modal-cripto-na-hora" class="lg:w-1/2 bg-white m-8 md:m-12 shadow p-12 rounded-lg text-gray-800 hover:shadow-lg ">
            <b>Termo de Uso para Plataforma de Venda de Criptomoedas</b>
            </br>
            <hr/> 
            </br> 
            <p>Este Termo de Uso (doravante referido como "Termo") estabelece as condições básicas para a utilização da plataforma de venda de criptomoedas (doravante referida como "Plataforma") fornecida por HOSTIZ WEB SERVICES LTDA (doravante referida como "Empresa"). Ao utilizar a Plataforma, você concorda em cumprir este Termo em sua totalidade. Por favor, leia cuidadosamente este documento.
            </br>
            Cadastro e Responsabilidade do Usuário
            </br>
            <b>1.1.</b> Para utilizar a Plataforma, é necessário realizar um cadastro fornecendo informações precisas e atualizadas. O usuário é responsável por manter a veracidade e a confidencialidade dos dados fornecidos durante o cadastro.
            </br>
            <b>1.2.</b> O usuário é o único responsável por todas as atividades realizadas em sua conta na Plataforma. A senha de acesso deve ser mantida em sigilo, não devendo ser compartilhada com terceiros. 1.3. O usuário reconhece que é responsável por garantir a precisão e a correção das informações fornecidas durante o processo de compra e venda de criptomoedas na Plataforma.
            </br>
            Processo de Compra e Venda de Criptomoedas
            </br>
            <b>2.1.</b> O usuário poderá realizar operações de compra e venda de criptomoedas utilizando a Plataforma. A operação de compra será efetuada após a confirmação do recebimento do pagamento por meio do PIX.
            </br>
            <b>2.2.</b> A Empresa se compromete a auditar e verificar a operação antes de enviar a criptomoeda para o endereço fornecido pelo usuário. Entretanto, o usuário reconhece que existem possíveis falhas no processo que podem resultar em perda de moedas ou atrasos nas transações, decorrentes de fatores como erros de sistema, interrupções na rede, oscilações do mercado, entre outros.
            </br>
            <b>2.3.</b> O usuário concorda que é responsável por fornecer corretamente seu endereço de carteira de criptomoedas e que qualquer erro de digitação no endereço resultará na perda irrecuperável das moedas. A Empresa não se responsabiliza por endereços incorretos fornecidos pelo usuário.
            </br>
            Riscos e Variações do Mercado de Criptomoedas
            </br>
            <b>3.1.</b> O usuário reconhece e concorda que as criptomoedas são ativos altamente voláteis e sujeitos a variações significativas de valor. Durante o processo de execução da ordem de compra, pode ocorrer uma oscilação muito alta no valor da moeda, o que pode afetar o resultado final da transação.
            </br>
            <b>3.2.</b> A Empresa não se responsabiliza por perdas ou ganhos resultantes de oscilações do mercado de criptomoedas durante o processo de execução da ordem de compra. O usuário assume total responsabilidade pelas consequências financeiras de tais variações.
            </br>
            Taxas e Comissões
            </br>
            <b>4.1.</b> A Empresa poderá cobrar taxas e comissões pelo uso da Plataforma e pelos serviços prestados. O usuário concorda em pagar todas as taxas aplicáveis antes da execução das operações de compra ou venda de criptomoedas.
            </br>
            Segurança e Proteção de Dados
            </br>
            <b>5.1.</b> A Empresa adota medidas de segurança razoáveis para proteger os dados e as transações dos usuários na Plataforma. No entanto, o usuário reconhece que a segurança absoluta na Internet não pode ser garantida e, portanto, a Empresa não se responsabiliza por eventuais violações de segurança que possam ocorrer.
            </br>
            <b>5.2.</b> O usuário é responsável por adotar medidas de segurança adequadas em seu próprio dispositivo e conexão de Internet para proteger seus dados pessoais e financeiros.
            </br>
            Limitação de Responsabilidade
            </br>
            <b>6.1.</b> Em nenhuma circunstância, a Empresa será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, mas não se limitando a, perda de lucros, dados, reputação, uso ou outras perdas intangíveis resultantes da utilização da Plataforma.
            </br>
            Alterações no Termo de Uso
            </br>
            <b>7.1.</b> A Empresa se reserva o direito de modificar este Termo a qualquer momento, a seu exclusivo critério. As alterações serão publicadas na Plataforma e entrarão em vigor imediatamente após a publicação. É responsabilidade do usuário revisar periodicamente este Termo para se manter atualizado sobre as condições de uso da Plataforma.
            </br>
            Ao utilizar a Plataforma, o usuário concorda e aceita todos os termos e condições estabelecidos neste documento. Se o usuário não concordar com qualquer parte deste Termo, ele não deverá utilizar a Plataforma.
            </br>
            Este Termo de Uso entra em vigor a partir da data de aceitação pelo usuário e permanece em vigor até sua rescisão.
            </br>
            Data de atualização deste Termo: 01/06/2023.</p>
        </div>
    `;
    target.appendChild(div);
    document.getElementById("bg-modal-cripto-na-hora").addEventListener("click", (e) => {
        if (!document.getElementById('content-modal-cripto-na-hora').contains(e.target)) {
            document.querySelector("body").style.overflow = '';
            document.getElementById("bg-modal-cripto-na-hora").remove(document.getElementById("bg-modal-cripto-na-hora"));
        }
    })
}

const verifyClickCheckBox = (checkbox) => {
    if (checkbox.checked && document.getElementsByClassName("errorinput").length == 0) {
        document.getElementById("button-next-input").classList.add("bg-custom-button")
        document.getElementById("button-next-input").disabled = false
    } else {
        document.getElementById("button-next-input").classList.remove("bg-custom-button")
        document.getElementById("button-next-input").disabled = true
    }
}

const parseToCurrencyValue = (value) => !isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0.00
const parseToCurrencyWithoutFixed = (value) => !isNaN(parseFloat(value)) ? parseFloat(value) : 0.00
