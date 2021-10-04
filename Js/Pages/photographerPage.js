// Gestion de l'affichage de la page photographe

class PhotographerPage {

    constructor(props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.render();
    }


    async render() {
        await this.showProfilPhotographe();
        await this.addFilterImage();
        await this.showMediaProfil();
        await this.showFormModal();
    }


    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }

    async addFilterImage () {
        const data = await this.dataManager.getPhotographerById(this.id);
        const newFilterImage =await new FilterImage(this.DOM, data);
    }

    // async creatFilterImage (data) {
    //     let dataIn = await data;
    //     const select = document.querySelector('#list');

    //     select.addEventListener("change", function() {

    //         const selectValue = document.querySelector('#list');

    //         console.log(selectValue);

    //         //Popularité
    //         if (this.value === 'Popularité') {
    //             console.log(dataIn);
    //             const array = newArray (dataIn, 'likes');
    //         }


    //         //Date
    //         if (this.value === 'Date') console.log('Date');


    //         //Titre
    //         if (this.value === 'Titre') console.log('Titre');


    //         function newArray(array, sort){
    //             array.sort(function (a, b){
    //                 if (a[sort] < b[sort]) return -1;
    //                 if (a[sort] > b[sort]) return 1;
    //                 return 0;
    //             });
    //         }
    //     })
    // }   


    async showMediaProfil() {
        const dataMedia = await this.dataManager.getMediaById(this.id);
        const mediaProfilIn = document.createElement('div');
        mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(mediaProfilIn);

        dataMedia.forEach(media => {
            new MediaProfil(media, mediaProfilIn, {
                lightbox : this.showLightbox.bind(this),
                likes : this.addLikesToTotal.bind(this)
            });
        });
    }

    async showLightbox (dataMedia) {
        new Lightbox(this.DOM, dataMedia);
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
    addLikesToTotal(add){

    }

}