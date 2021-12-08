// Gestion données fetch

class DataManager {

    data = {};

    constructor(src) {
        this.source = src;
    }


    /**
     * Récuperation des données de la data
     *
     * @return  {Array} 
     */
    async getAllData() {
        const allData = await fetch(this.source);
        this.data = await allData.json();
    }


    /**
     * retourne la liste des photographes en fonction des tags choisis
     *
     * @param   {Array.<String>}  filters  [filters description]
     *
     * @return  {}           [return description]
     */
    async getPhotographerList(filters) {
        if (Object.entries(this.data).length === 0) await this.getAllData();
        if (filters.length === 0) return this.data.photographers;
        const list = [];
        this.data.photographers.forEach(photographer => {
            let common = 0;
            filters.forEach(filter => {
                if (photographer.tags.indexOf(filter) >= 0) common++;
            });
            if (common > 0) list.push(photographer);
        });
        return list;
    }


    /**
     * Récuperation des données de l'ensemble des photographe
     *
     * @return  {Array}
     */
    async getPhotographerSort() {
        if (Object.entries(this.data).length === 0) await this.getAllData();
        return this.data.photographers;
    }


    /**
     * Récuperation des données de l'ensemble des medias
     *
     * @return  {Array}
     */
    async getMediaList() {
        if (Object.entries(this.data).length === 0) await this.getAllData();
        return this.data.media;
    }


    /**
     * Récuperation des données des Media  en fonctiond de l'ID du photographe selectionné 
     *
     * @param   {Number}  photographerId 
     *
     * @return  {Array}  
     */
    async getMediaById(photographerId) {
        const mediaStock = [];
        if (Object.entries(this.data).length === 0) await this.getAllData();
        this.data.media.forEach(media => {
            if (media.photographerId === photographerId) mediaStock.push(media);
        });

        return mediaStock;
    }


    /**
     * [getPhotographerById description]
     *
     * @param   {[type]}  id  [id description]
     *
     * @return  {[type]}      [return description]
     */
    async getPhotographerById(id) {
        if (Object.entries(this.data).length === 0) await this.getAllData();
        for (const photographer of this.data.photographers) {
            if (photographer.id === id) return photographer;
        }
    }


    /**
     * Récuperation des données des media en fonction du photographe delectionné et ajustement de l'ordre en fonciton de l'option selectionné 
     *
     * @param   {Array}  idPhotographer  [idPhotographer description]
     * @param   {Sort}  filter          [filter description]
     * @param   {HTMLElement}  id              [id description]
     *
     * @return  {Array}                  [return description]
     */
    async getOrderedMedia(idPhotographer, filter, id) {
        const media = await this.getMediaById(idPhotographer);
        const select = document.querySelector('.divIn');
        const selectIn = select.querySelector('div');


        /**
         * Création d'un nouvel array en fonction du choix effectué 
         *
         * @return  {Array}
         */
        function showArray() {
            let array;

            if (`${filter.toLocaleLowerCase()}Option` === 'popularitéOption') {
                array = newArray(Object.values(media), 'likes');
                return array;
            }

            if (`${filter.toLocaleLowerCase()}Option` === 'dateOption') {
                const array = newArray(Object.values(media), 'date');
                return array;
            }

            if (`${filter.toLocaleLowerCase()}Option` === 'titreOption') {
                const array = newArray(Object.values(media), 'title');
                return array;
            }
        }


        /**
         * Filtre des media 
         *
         * @param   {Array}  array
         * @param   {Array}  sort 
         *
         * @return  {Array} 
         */
        function newArray(array, sort) {
            array.sort(function (a, b) {
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });

            return array;
        }
        return showArray()
    }
}