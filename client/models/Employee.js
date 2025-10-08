class Employee{
    #id
    #salary
    #performance
    #job_title
    #fk_department_id

    constructor(id, salary, performance, job_title, department_id){
        this.#id = id;
        this.salary = salary;
        this.peperformance = performance;
        this.#job_title = job_title;
        this.#fk_department_id = department_id;
    }

    get id(){
        return this.#id;
    }

    get salary(){
        return this.#salary;
    }

    
    get performance(){
        return this.#performance;
    }

    
    get job_title(){
        return this.#job_title;
    }

    
    get department_id(){
        return this.#fk_department_id;
    }
}

export default Employee