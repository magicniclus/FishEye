// Gestion données fetch
//TODO : commanter le code

class DataManager {

    data = {};

    constructor(src) {
        this.source = src;
    }

    async getAllData (){
        const allData = await fetch(this.source);
        this.data     = await allData.json();
    }

    /**
     * retourne la liste des photographes en fonction des tags choisis
     *
     * @param   {Array.<String>}  filters  [filters description]
     *
     * @return  {array}           [return description]
     */
     async getPhotographerList (filters) {
        if(Object.entries(this.data).length === 0) await this.getAllData();
        if(filters.length === 0) return this.data.photographers;
        const list = [];
        this.data.photographers.forEach(photographer => {
            let common = 0;
            filters.forEach(filter => {
                if(photographer.tags.indexOf(filter)>=0) common++;
            });
            if (common >0) list.push(photographer);
        });
        return list;
    }

    async getPhotographerSort () {
        if(Object.entries(this.data).length === 0) await this.getAllData();
        return this.data.photographers;
    }

    async getMediaList () {
        if(Object.entries(this.data).length === 0) await this.getAllData();
        return this.data.media;
    }

    async getMediaById (photographerId) {
        const mediaStock = [];
        if(Object.entries(this.data).length === 0) await this.getAllData();
        this.data.media.forEach(media => {
            if (media.photographerId === photographerId) mediaStock.push(media);
        });

        return mediaStock;
    }
    async getPhotographerById(id){
        if(Object.entries(this.data).length === 0) await this.getAllData();
        for (const photographer of this.data.photographers){
            if (photographer.id === id) return photographer;
        }
    }

    async getOrderedMedia(idPhotographer, filter, id){
        const media = await this.getMediaById(idPhotographer);
        const select = document.querySelector('.divIn');
        const selectIn = select.querySelector('div');


        function showArray () {
            let array;
            
            if(`${filter.toLocaleLowerCase()}Option` === 'popularitéOption'){
                array = newArray (Object.values(media), 'likes');
                return array;
            } 

            if(`${filter.toLocaleLowerCase()}Option` === 'dateOption'){
                const array = newArray (Object.values(media), 'date');
                return array;
            }

            if(`${filter.toLocaleLowerCase()}Option` === 'titreOption'){
                const array = newArray (Object.values(media), 'title');
                return array;
            }
        }

        function newArray(array, sort){
            array.sort(function (a, b){
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });

             return array;
        } 
        return showArray()
    }

}