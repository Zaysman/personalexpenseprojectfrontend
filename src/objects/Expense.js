class Expense {

    constructor(expenseid, userid, amount, date, category, description) {
        this.expenseid = expenseid;
        this.userid = userid;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.description = description;
    }


    getExpenseID() {
        return this.expenseid;
    }

    setExpenseID(expenseid) {
        this.expenseid = expenseid;
    }

    getUserID() {
        return this.userid;
    }

    setUserID(userid) {
        this.userid = userid;
    }

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        this.date = date;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

}

export default Expense;