class FilterImage {
    constructor (domTarget, props){
        this.DOM = document.createElement('div');
        this.DOM.setAttribute('class', 'filtreBouton');
        this.id = parseInt(window.location.search.slice(4));
        this.data = props
        this.render();
        domTarget.appendChild(this.DOM);
    }

    async render () {
        await this.selectHTML();
        await this.getSelectValue(await this.data);
    }

    selectHTML () {
        this.DOM.innerHTML = `
        <label for="filtre-select">Trier par</label>

        <select id="list">
            <option class='populariteOption' value="popularite" >Popularité</option>
            <option class='dateOption' value="date">Date</option>
            <option class='titreOption' value="titre">Titre</option>
        </select>
        `
    }

    getSelectValue(data) {

        const select = document.querySelector('#list');

        let desc = false;


        //Popularité filtre
                
        select.addEventListener('change', function(){
            if(this.value === 'popularite'){
                const arrayLikes = newArray (Object.values(data), 'likes');
                console.log(arrayLikes);
            }

            if(this.value === 'date'){
                const arrayDate = newArray (Object.values(data), 'date');
                console.log(arrayDate);
            }

            if (this.value === 'titre'){
                const arrayTitre = newArray (Object.values(data), 'title');
                console.log(arrayTitre);
            }
        });


        function newArray(array, sort){
            array.sort(function (a, b){
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });

            return array;
        }
    }
}