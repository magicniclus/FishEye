// Gestiond de l'affichage de la page index 

class IndexPage {
    
    constructor (props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.filters = [];
        this.render ();
    }

    render () {
        this.DOM.innerText="";
        new Header (this.DOM, 'Sample_Photos/logo/logo.png', this.showTag('.tagIn'), 'Nos photographes');
        this.showVignettePhotographers ();
    }


    async showVignettePhotographers () {

        let data = await this.dataManager.getPhotographerList(this.filters);

        for (const photographe of data){
            new VignettePhotographer (photographe, this.DOM);
        }
    }

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

    filterByTag(newTag){
        const index = this.filters.indexOf(newTag);
        if(index >= 0) this.filters.splice(index, 1);
        else this.filters.push(newTag);
        this.render();
    }

}