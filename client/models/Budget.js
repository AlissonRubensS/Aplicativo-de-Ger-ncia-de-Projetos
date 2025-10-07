class Budget {
    #id;
    #name;
    #local;
    #desc;
    constructor(id, name, local, desc) {
        this.#id = id;
        this.#name = name;
        this.#local = local;
        this.#desc = desc;
    }
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get local() {
        return this.#local;
    }
    get desc() {
        return this.#desc;
    }
}

export default Budget;