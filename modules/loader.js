class Loader
{
    constructor()
    {
        this.images = {};
    }
    add_image(key, src)
    {
        var img = new Image();

        var d = new Promise(function (resolve, reject) {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(this);

            img.onerror = function () {
                reject('Could not load image: ' + src);
            };
        }.bind(this));

        img.src = src;
        return d;
    }
    getImage()
    {
        return (key in this.images) ? this.images[key] : null;
    }
}
module.exports = {Loader};