/**
 * Gestiond de l'affichage de la page index 
 */
class IndexPage {
    
    /**
     * Constructor
     *
     * @param   {Object}  props      [props description]
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     */
    constructor (props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.filters = [];
        // @ts-ignore
        new Header (this.DOM, 'Sample_Photos/logo/logo.png', this.showTag('.tagIn'), 'Nos photographes');
        new Link(this.DOM)
        this.vignetteIn = document.createElement('div');
        this.vignetteIn.setAttribute('class', 'vignetteIn');
        this.DOM.appendChild(this.vignetteIn);
        this.render ();
    }


    /**
     * Gestion de l'affichage des elements de la page index:
     * Affichage des vignettes grace aux data et en fonction de this.filters qui est remplis au click sur les tags
     * grace à la fonction filterByTag
     *
     */
    async render () {
        this.vignetteIn.innerText="";
        let data = await this.dataManager.getPhotographerList(this.filters);
        
        for (const photographe of data){
            new VignettePhotographer (photographe, this.vignetteIn);
        }
    }


    /**
     * Ajout des tags dans le header grace à la class Tags
     * et filtre des profils en fonction de true ou false du inner
     *
     * @param   {boolean}  inner  [inner description]
     * 
     *
     */
    async showTag (inner) {
        let data = await this.dataManager.getMediaList();
        let tagArray = [];

        data.forEach(media => {
            tagArray.push(media.tags[0]);
        });

        const tagArraySet = new Set (tagArray);

        [...tagArraySet].forEach(element => {
            new Tags (element, document.querySelector(inner),this.filterByTag.bind(this));
        });
    }

    /**
     * Filtre des tags au click et gestion gestion du render en fonction des tags cliqués 
     * c'est fonction callBack de la class Tags
     *
     * @param   {Array}  newTag  [newTag description]
     *
     * @return  {void}          [return description]
     */
    filterByTag(newTag){
        const index = this.filters.indexOf(newTag);
        if(index >= 0) this.filters.splice(index, 1);
        else this.filters.push(newTag);
        this.render();
    }

}