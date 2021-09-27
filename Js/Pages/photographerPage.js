// Gestion de l'affichage de la page photographe

class PhotographerPage {

    constructor (props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.render ();
    }


    async render () {

        this.showProfilPhotographe();
        this.showMediaProfil();
    }


    async showProfilPhotographe () {
        const data = await this.dataManager.getPhotographerById(this.id);
        const newProfil = new ProfilPhotographe (data, this.DOM);
    }


    async showMediaProfil (){
        const dataMedia = await this.dataManager.getMediaById(this.id);

        dataMedia.forEach(media => {
            new MediaProfil(media, this.DOM);
        });
    }

}