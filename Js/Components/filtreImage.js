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

        select.addEventListener("change", function() {

            console.log(this.value);
            //Popularité
            if (this.value === 'popularite') {
                // console.log(data);
                // const array = newArray (data, 'likes');
                // console.log(array);
                // const array = data;
                // const arrayMap = array.map(x => x * 2);
                // console.log(arrayMap);
            }


            //Date
            if (this.value === 'Date') console.log('Date');


            //Titre
            if (this.value === 'Titre') console.log('Titre');


            function newArray(array, valeur){
                array.sort(function (a, b){
                    if (a[valeur] < b[valeur]) return -1;
                    if (a[valeur] > b[valeur]) return 1;
                    return 0;
                });
            }
        })
    }
}