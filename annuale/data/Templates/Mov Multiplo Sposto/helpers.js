function now() {
    const date = new Date
    const dateString = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}.${date.getSeconds()}`
    return (dateString)
}

function isCliente(carico) {
    if (carico.is_cliente == 1) {
        return '{#asset PeopleAltTwoTone.svg @encoding=dataURI}'
    } else {
        return '{#asset StoreMallDirectoryTwoTone.svg @encoding=dataURI}'
    }
}

function pFloat(value){
    return parseFloat(value)
}

function logoAzienda(IMPIANTO) {
    if (IMPIANTO == 'ILMONDO') return '{#asset logo_il_mondo.png @encoding=dataURI}'
    if (IMPIANTO == 'PROSYT') return '{#asset logo_prosyt_assieme.svg @encoding=dataURI}'
}

function printIntestazione(IMPIANTO){
    if(IMPIANTO === 'ILMONDO') return "VIA CARDANO, 28/A FIDENZA, PR 43036, EMILIA ROMAGNA Telefono: 0524 522460 Fax: 0524 510110 Email: info@ilmondosrl.com Sito Web: https://ilmondosrl.com "
    if(IMPIANTO === 'PROSYT') return "via V. Alfieri, 2 30038 Spinea (VE)<br/>  Tel. +39 041 5084911 Fax + 39 041 5084981"
}