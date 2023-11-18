class Product {
    constructor(id, productName, price, discountPrice, categoryId, category, imageName, createdDate, UpdatedDate) {
        this.id = id
        this.productName = productName
        this.price = price
        this.discountPrice = discountPrice
        this.categoryId = categoryId
        this.category = category
        this.imageName = imageName
        this.createdDate = createdDate
        this.UpdatedDate = UpdatedDate
    }
}

module.exports = Product