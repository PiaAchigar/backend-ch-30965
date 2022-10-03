class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.id = product._id || product.id;
    }
}

module.exports = ProductDTO;

//Lo llaman desde ProductRepository.js
//ésto DTOs son clases con las que mapeamos productos o Usuarios