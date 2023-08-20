const filterResults = (results, requestedCoinsArr) => {
    let notAllowed
    let count = 0
    const newArr = []
    const indexToDelete = []

    for(let i=0; i<results.length; i++) {
        if(i !== notAllowed) {
            if((results[i].status === 'rejected') || (results[i].value?.message == '(U)Request too many requests') || (results[i].value?.status == 'error')) 
            {
                if(i % 2 === 0) { // четное
                    notAllowed = i+1
                }
                if(i % 2 !== 0) { // нечётное
                    newArr.pop()
                }
                indexToDelete.push(count)
            } else {
                newArr.push(results[i].value)
            }
        }
        if(i % 2 !== 0) count ++
    }

    if(indexToDelete.length) {
        for(let i=indexToDelete.length-1; i >= 0; i--) {
            requestedCoinsArr.splice(indexToDelete[i], 1)
        }
    }

    return [newArr, requestedCoinsArr]
}

module.exports = { filterResults };
