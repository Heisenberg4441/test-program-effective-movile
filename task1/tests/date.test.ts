test('date', () => {
    const date = new Date()
    const day = date.getDate()
    let month = JSON.stringify(date.getMonth()+1)
    const year = date.getFullYear()
    if(month.length === 1) {
        month = `0${month}`
    }
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const time = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
    console.log(time)
})