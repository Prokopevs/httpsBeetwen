
const checkSameStr = (sameString, OutNetwork, InNetwork) => {
    if( sameString.substr(-1) === "/" ) sameString = sameString.slice(0, -1)
    if( sameString.substr(0) === "/" ) sameString = sameString.slice(1)
    if(sameString === 'RC20') sameString = '' // исключаем RC20
    if((OutNetwork == 'AE') && (InNetwork == 'AE')) sameString = 'AE ' // исключение AE
    if(sameString === 'UM ') sameString = '' // исключаем 'UM '

    return sameString
}

module.exports = { checkSameStr }