import { Champions } from './champions.js'

export class Favorites {
    constructor(app) {
        this.app = document.querySelector(app)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@league-favorites:')) || []
    }

    save() {
        localStorage.setItem('@league-favorites:', JSON.stringify(this.entries))
    }


    async add(champname) {
        try {
            const champExists = this.entries.find(entry => entry.name === champname)

            if(champExists) {
                throw new Error('Campeão já inserido!')
            }

            const champion = await new Champions().search(champname)

            if(!champion) {
                throw new Error('Campeão não encontrado!')
            }

            this.entries = [champion, ...this.entries]
            this.update()
            this.save()
        } catch(error) {
            alert(error.message)
        }
    }

    delete(champion) {
        const filteredEntries = this.entries
        .filter((entry) => entry.name !== champion.name)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(app) {
        super(app)
        this.tbody = this.app.querySelector('table tbody')
        this.update()

        this.onadd()
    }

    onadd() {
        const addButton = this.app.querySelector('.searchbar button')

        addButton.onclick = () => {
            const { value } = this.app.querySelector('.searchbar input')
            
            this.add(value)
        }
    }

    update() {
        this.removeAllTr()


        this.entries.forEach(champion => {
            const row = this.createRow()

            row.querySelector('.champimg').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.image}_0.jpg`
            row.querySelector('.champ p').textContent = champion.name
            row.querySelector('.champimg').alt = `Imagem do campeão ${champion.name}`
            row.querySelector('.titulo').textContent = champion.title
            row.querySelector('.tags').textContent = champion.tags.join(', ')

            row.querySelector('.remover').onclick = () => {
                const itsOk = confirm('Tem certeza que deseja remover esse campeão?')

                if(itsOk) {
                    this.delete(champion)
                }
            }

            this.tbody.append(row)
        })

        
    }


    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = ` <td class="champ">
                            
        <img class="champimg" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg" alt="Splashart do campeão">
       
        
        <p>Garen</p>
        </td>

        <td class="titulo">The Might of Demacia</td>
        <td class="tags">Fighter, Tank</td>
        <td class="remover">Remover</td>`

        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}