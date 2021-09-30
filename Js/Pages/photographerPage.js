// Gestion de l'affichage de la page photographe

class PhotographerPage {

    constructor(props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.render();
    }


    async render() {
        this.showProfilPhotographe();
        this.showMediaProfil();
        this.showFormModal();
        this.showLightbox();
    }


    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }


    async showMediaProfil() {
        const dataMedia = await this.dataManager.getMediaById(this.id);
        const mediaProfilIn = document.createElement('div');
        mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(mediaProfilIn);

        dataMedia.forEach(media => {
            new MediaProfil(media, mediaProfilIn);
        });
    }

    async showLightbox () {
        const dataMedia = await this.dataManager.getMediaById(this.id);
        new Lightbox(this.DOM, dataMedia);
    }

    async showFormModal() {
        const data = await this.dataManager.getPhotographerById(this.id);

        const form = new FormModal(this.DOM, data.name);
    }
}