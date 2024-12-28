class User {

    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

}

export default User;