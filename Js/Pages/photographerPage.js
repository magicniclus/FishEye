// Gestion de l'affichage de la page photographe

class PhotographerPage {

    constructor(props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.filters = [
            "Popularité",
            "Date",
            "Titre"
        ]
        this.currentFilter = this.filters[0];
        this.render();
    }


    async render() {
        this.DOM.innerText="";
        await this.showProfilPhotographe();
        await this.addFilterImage();
        await this.showMediaProfil();
        await this.showFormModal(); 
    }


    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }

    async addFilterImage() {
        const newFilterImage = new FilterImage(this.DOM, this.filters, this.updateFilter.bind(this)); 
    }


    async showMediaProfil() {
        const data = await this.dataManager.getOrderedMedia(this.id, this.currentFilter);
        this.list = data;

        const titreOption = document.querySelector('.titreOption');

        // titreOption.addEventListener('click', function (){
        //     window.location.href= 'photographerPage.html?id='+this.id;
        // })

        // console.log(">>>", data)
        const mediaProfilIn = document.createElement('div');
        mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(mediaProfilIn);

        data.forEach(media => {
            new MediaProfil(media, mediaProfilIn, {
                lightbox: this.showLightbox.bind(this),
                likes: this.addLikesToTotal.bind(this)
            });
        });
    }

    async showLightbox(dataMedia) {
        new Lightbox(this.DOM, {...dataMedia, list : this.list});
    }

    async showFormModal() {
        const data = await this.dataManager.getPhotographerById(this.id);

        const form = new FormModal(this.DOM, data.name);
    }

    /**
     * [addLikesToTotal description]
     *
     * @param   {Boolean}  add  true : ajoute false : retitre
     *
     * @return  {void}       [return description]
     */
    addLikesToTotal(add) {

    }

    updateFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }

}