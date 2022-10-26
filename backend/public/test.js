const getData = async () => {
    return fetch('/getData')
        .then(res => res.json())
        .then(data => {
            return data
        })
}

const $body = document.querySelector('body')
const renderData = await getData();
console.log(renderData)

renderData.forEach((items) => {
    const $div = document.createElement('div')
    items.forEach((item) => {
        const $p = document.createElement('p')
        $p.textContent = item
        $p.style.margin = '20px';
        $div.appendChild($p)
    })
    $div.style.display = 'flex'
    $div.style.flexDirection = 'row'
    $body.appendChild($div)
})