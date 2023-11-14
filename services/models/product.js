class Product {
    constructor(id, producrName, price, discountPrice, categoryId, createdDate, UpdatedDate) {
        this.id = id
        this.producrName = producrName
        this.price = price
        this.discountPrice = discountPrice
        this.categoryId = categoryId
        this.createdDate = createdDate
        this.UpdatedDate = UpdatedDate
    }
}

module.exports = Product