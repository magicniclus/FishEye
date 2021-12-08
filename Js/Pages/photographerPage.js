// Gestion de l'affichage de la page photographe

class PhotographerPage {

    price;
    totalLikes;
    banniere;

    /**
     * Gestion de l'affichage de la page photographe
     * et des differents éléments nessesaires au différentes fonctions
     *
     * @param   {Object}  props      Appel du dataManager
     * @param   {HTMLElement}  domTarget  
     *
     */
    constructor(props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.filters = [
            "Popularité",
            "Date",
            "Titre"
        ];
        this.currentFilter = this.filters[0];
        this.firstRender();
    }


    /**
     * Gestion des premiers affichage des éléments statiques
     *
     */
    async firstRender() {
        this.DOM.innerText = "";
        await this.addLogo(this.DOM)
        await this.showProfilPhotographe();
        this.addFilterImage();
        this.mediaProfilIn = document.createElement('div');
        this.mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(this.mediaProfilIn);
        await this.showMediaProfil();
        await this.showFormModal();
        this.banniere = new BanierePhotographe(this.DOM, this.totalLikes, this.price);
    }


    /**
     * Gestion de l'affichage des media en fonction de l'interaction de l'utilisateur 
     *
     */
    async render() {
        this.mediaProfilIn.innerText = "";
        await this.showMediaProfil();
    }


    /**
     * Affichage de la vignette photographe en récuperant la class "PhofilPhotographe"
     *
     */
    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        this.price = data.price;
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }


    /**
     * Ajout du bouton de filtre des images en récuperant la class newFilterImage et appel de fonction callBack updateFilter que l'on bind pour la remettre dans le context
     *
     */
    async addFilterImage() {
        const newFilterImage = new FilterImage(this.DOM, this.filters, this.updateFilter.bind(this));
    }


    /**
     * Affichage des media en récuperant la class getOrderMedia qui filtre les media au click sur les differents options du bouton de filtre
     * les options sont définis dans this.filters
     * Ajout des fonction de callBack this.showLightBox et updateLikesToTotal au click sur les images ou sur les les likes 
     * bind des ces derniers pour la remise dans le context
     *
     */
    async showMediaProfil() {
        const data = await this.dataManager.getOrderedMedia(this.id, this.currentFilter);
        this.list = data;

        const titreOption = document.querySelector('.titreOption');
        this.totalLikes = 0;
        data.forEach(media => {
            new MediaProfil(media, this.mediaProfilIn, {
                lightbox: this.showLightbox.bind(this),
                likes: this.updateLikesToTotal.bind(this)
            });
            this.totalLikes += media.likes;
        });
    }


    /**
     * Affichage de la lightbox en récuperant la class lightbox qui est appelé en fonction de callBack dans la fonction showMediaProfil
     * 
     *
     */
    async showLightbox(dataMedia) {
        new Lightbox(this.DOM, { ...dataMedia, list: this.list });
    }


    /**
     * Affichage du formulaire en récuperant la class FormModal
     *
     */
    async showFormModal() {
        const data = await this.dataManager.getPhotographerById(this.id);

        const form = new FormModal(this.DOM, data.name);
    }

    /**
     * Modification de la valuer des tags de +1 ou -1 en fonction du boolean add 
     *
     * @param   {Boolean}  add  true : ajoute false : retitre
     *
     * @return  {void}       [return description]
     */
    updateLikesToTotal(add) {
        this.totalLikes += add ? 1 : -1;
        this.banniere.updateLikes(this.totalLikes);
    }


    /**
     * Gestion du filtre des images 
     *
     * @param   {ListeningState}  filter  [filter description]
     *
     * @return  {void}          [return description]
     */
    updateFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }


    /**
     * Ajout du logo
     *
     * @param   {HTMLElement}  parent  [parent description]
     *
     * @return  {void}          [return description]
     */
    addLogo(parent) {
        this.logo = document.createElement('a');
        this.logo.classList.add('logoPhotographerPage')
        this.logo.setAttribute('href', 'index.html')
        this.logo.innerHTML = `
            <img class='logoFishEye' alt='logo du site fish eye' src='Sample_Photos/logo/logo.png'>
        `;
        parent.appendChild(this.logo);
    }

}