class CategoryExpense {

    constructor(categoryName, amount) {
        this.categoryName = categoryName;
        this.amount = amount;
    }

    getCategoryName() {
        return this.categoryName;
    }

    setCategoryName(categoryName) {
        this.categoryName = categoryName;
    }

    getAmount() {
        return this.amount;
    }

    setCategoryName(amount) {
        this.amount = amount;
    }

}

export default CategoryExpense;