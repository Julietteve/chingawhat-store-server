class Product {

    constructor( id, timestamp, name, description, code, thumbnail, price, stock){
        this.id = id,
        this.timestamp = timestamp,
        this.name = name,
        this.description = description,
        this.code= code, 
        this.thumbnail = thumbnail
        this.price = price,
        this.stock = stock
    }
}

module.exports = { Product }