// Gestion de l'affichage de la page photographe
//TODO : commanter le code

class PhotographerPage {

    price;
    totalLikes;
    banniere;

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


    async firstRender() {
        this.DOM.innerText="";
        await this.addLogo(this.DOM)
        await this.showProfilPhotographe();
        this.addFilterImage();
        this.mediaProfilIn = document.createElement('div');
        this.mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(this.mediaProfilIn);
        await this.showMediaProfil();
        await this.showFormModal(); 
        this.banniere = new BanierePhotographe (this.DOM, this.totalLikes, this.price);
    }

    async render(){
        this.mediaProfilIn.innerText = "";
        await this.showMediaProfil();
    }


    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        this.price = data.price;
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }

    async addFilterImage() {
        const newFilterImage = new FilterImage(this.DOM, this.filters, this.updateFilter.bind(this)); 
    }


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
            this.totalLikes+= media.likes;
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
    updateLikesToTotal(add) {
        this.totalLikes += add? 1 : -1;
        this.banniere.updateLikes(this.totalLikes);
    }

    updateFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }

    addLogo (parent) {
        this.logo = document.createElement('a');
        this.logo.classList.add('logoPhotographerPage')
        this.logo.setAttribute('href', 'index.html')
        this.logo.innerHTML = `
            <img class='logoFishEye' alt='logo du site fish eye' src='Sample_Photos/logo/logo.png'>
        `;
        parent.appendChild(this.logo);
    }

}