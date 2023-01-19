const buttons = document.querySelectorAll('.menu-btn');
const cards = document.querySelector('div.cards');
const mainNav = document.querySelector('.nav');
const prev = document.createElement('button');
prev.classList.add('nav-btn','prev');
prev.innerHTML = 'Previous'
const next = document.createElement('button');
next.classList.add('nav-btn','next');
next.innerHTML = 'Next';
let id = 'leaf'
let page = 1

const ninjas = `{
    characters(filter: {village: "${id}"} page: ${page}) {
        info {
            pages
            next
            prev
        }
        results {
            name
            avatarSrc
            rank
        }
    }
}`

buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        id = button.getAttribute('id');
        page = 1
        const ninjas = `{
            characters(filter: {village: "${id}"} page: ${page}) {
                info {
                    pages
                    next
                    prev
                }
                results {
                    name
                    avatarSrc
                    rank
                }
            }
        }`
        buttons.forEach ((button) => button.classList.remove('btn-active'));
        button.classList.add('btn-active');
        findNinjas(ninjas)
    })
})

const findNinjas  = async function (query) {
    fetch('https://narutoql.up.railway.app/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        cards.innerHTML = ''
        data.data.characters.results.forEach(ninja => {
            const card = document.createElement('div.card')
            card.innerHTML = `
            <div class="card">
                <img src="${[ninja.avatarSrc]}">
                <div class="desc">
                    <h2>${[ninja.name]}</h2>
                    <span>
                        <strong>Rank: </strong>${[ninja.rank]}<br>
                    </span>
                </div>
            </div>
            ` 
            cards.appendChild(card)
        }
        );
        if(data.data.characters.info.prev !== null) {
            mainNav.appendChild(prev);
        } else if(data.data.characters.info.prev == null) {
            prev.remove();
        }
        if(data.data.characters.info.next !== null) {
            mainNav.appendChild(next);
        } else if(data.data.characters.info.next == null) {
            next.remove();
        }
    })
}

next.addEventListener("click", () => {
    page += 1
    const ninjas = `{
        characters(filter: {village: "${id}"} page: ${page}) {
            info {
                pages
                next
                prev
            }
            results {
                name
                avatarSrc
                rank
            }
        }
    }`
    findNinjas (ninjas)
})

prev.addEventListener("click", () => {
    page -= 1
    const ninjas = `{
        characters(filter: {village: "${id}"} page: ${page}) {
            info {
                pages
                next
                prev
            }
            results {
                name
                avatarSrc
                rank
            }
        }
    }`
    findNinjas (ninjas)
})

document.querySelector('#leaf').classList.add('btn-active')
findNinjas (`{
    characters(filter: {village: "${id}"} page: ${page}) {
        info {
            pages
            next
            prev
        }
        results {
            name
            avatarSrc
            rank
        }
    }
}`)