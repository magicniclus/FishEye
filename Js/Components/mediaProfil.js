//Ajout des media en fonction de leurs type

class MediaProfil {
    constructor(data, domTarget) {
        this.DOM = document.createElement("article");
        this.DOM.setAttribute("class", 'photographerImg')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }

        this.render();
    }

    render() {
        this.DOM.innerHTML = this.image ? this.templateImage() : this.templateVideo();


        const likesImg = document.querySelector('.likesImg');
    }


    templateImage() {
        return `
                <div class='imgContainer'>
                    <img class="photoImg" src="Sample_Photos/${this.image}" alt="${this.title}">   
                </div>  
                <div class="bottomImg">
                    <div class="bottomLeft">
                        <span class="titleImg">${this.title}</span>
                        <span class="priceImg">${this.price}<span class="sigle">€</span></span>
                    </div>    
                    <div class="likeImgGlobal">
                        <span class="likesImg">${this.likes}</span>
                        <i class="fas fa-heart"></i>
                    </div>    
                </div>   
        `;
    }

    templateVideo() {
        return `
                <div class='videoContainer'>
                    <video autoplay loop> 
                        <source src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.title}">
                    </video>   
                </div>
                <div class="bottomVideo">
                <div class="bottomLeft">
                    <span class="titleVideo">${this.title}</span>
                    <span class="priceVideo">${this.price}<span class="sigle">€</span></span>
                </div>    
                    <div class="likeVideoGlobal">
                        <span class="likesVideo">${this.likes}</span>
                        <i class="fas fa-heart"></i>
                    </div>    
                </div>   
        `;
    }
}