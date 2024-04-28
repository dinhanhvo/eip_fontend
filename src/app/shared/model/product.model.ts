export interface ProductModel {
    id: number,
    name: String,
    description: String,
    imagepath: String,
    imported_at: Date,
    price: Number,
    note: String,
    from: String,
    status: String,
    unit: String,
    type: Number,
    categoryId: Number,
    currencyId: Number
}