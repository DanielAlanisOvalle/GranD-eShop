class Producto {
    id
    title
    description
    price
    discountPercentage
    rating
    stock
    brand
    category
    thumbnail
    image = [];

    constructor(prod) {
        this.id = prod.id;
        this.title = prod.title;
        this.description = prod.description;
        this.price = prod.price;
        this.discountPercentage = prod.discountPercentage;
        this.rating = prod.rating;
        this.stock = prod.stock;
        this.brand = prod.brand;
        this.category = prod.category;
        this.thumbnail = prod.thumbnail;
        this.image = prod.image;
    }

    set Id(_id) {
        this.id = _id;
    }

    get Id() {
        return this.id;
    }

    set Title(_title) {
        this.title = _title;
    }

    get Title() {
        return this.title;
    }
    set Description(_description) {
        this.description = _description;
    }

    get Description() {
        return this.description;
    }
    set Price(_price) {
        this.price = _price;
    }

    get Price() {
        return this.price;
    }
    set DiscountPercentage(_discountPercentage) {
        this.discountPercentage = _discountPercentage;
    }

    get DiscountPercentage() {
        return this.discountPercentage;
    }
    set Rating(_rating) {
        this.rating = _rating;
    }

    get Rating() {
        return this.rating;
    }
    set Stock(_stock) {
        this.stock = _stock;
    }

    get Stock() {
        return this.stock;
    }
    set Brand(_brand) {
        this.brand = _brand;
    }

    get Brand() {
        return this.brand;
    }
    set Category(_category) {
        this.category = _category;
    }

    get Category() {
        return this.category;
    }
    set Thumbnail(_thumbnail) {
        this.thumbnail = _thumbnail;
    }

    get Thumbnail() {
        return this.thumbnail;
    }
    set Image(_image) {
        this.image = _image;
    }

    get Image() {
        return this.image;
    }

    obtenerImagenIndicada(indice) {
        if (indice <= this.image.length) {
            return this.image[indice];
        }
        return null;
    }
}