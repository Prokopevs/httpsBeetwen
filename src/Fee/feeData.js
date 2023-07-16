let binanceFee = {feeData: []}
let mexcFee = {feeData: []}
let bibitFee = {feeData: [
    {   
        coin: 'MULTI',
        networkList: [
            {
                coin: 'MULTI',
                depositDesc: 'Deposit suspended due to wallet maintenance',
                depositEnable: true,
                minConfirm: 64,
                name: 'Multichain',
                network: 'ERC20',
                withdrawEnable: true,
                withdrawFee: '0.250000000000000000',
                withdrawIntegerMultiple: null,
                withdrawMax: '50000.000000000000000000',
                withdrawMin: '1.000000000000000000',
                sameAddress: false,
                contract: '0x65Ef703f5594D2573eb71Aaf55BC0CB548492df4',
                withdrawTips: null,
                depositTips: null
            },
            {
                coin: 'MULTI',
                depositDesc: 'Deposit suspended due to wallet maintenance',
                depositEnable: true,
                minConfirm: 64,
                name: 'Multichain',
                network: 'BEP20',
                withdrawEnable: true,
                withdrawFee: '0.250000000000000000',
                withdrawIntegerMultiple: null,
                withdrawMax: '50000.000000000000000000',
                withdrawMin: '1.000000000000000000',
                sameAddress: false,
                contract: '0x65Ef703f5594D2573eb71Aaf55BC0CB548492df4',
                withdrawTips: null,
                depositTips: null
            },
        ]
    },
]}

module.exports = { binanceFee, mexcFee, bibitFee}