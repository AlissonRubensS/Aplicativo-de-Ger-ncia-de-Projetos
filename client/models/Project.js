export class Project {
  #project_id;
  #project_name;
  #project_desc;
  #project_local;
  #begin_date;
  #end_date;
  #deadline;
  #status;

  constructor(
    project_id,
    project_name,
    project_desc,
    project_local,
    begin_date,
    end_date,
    deadline,
    status
  ) {
    this.#project_id = project_id;
    this.#project_name = project_name;
    this.#project_desc = project_desc;
    this.#project_local = project_local;
    this.#begin_date = begin_date;
    this.#end_date = end_date;
    this.#deadline = deadline;
    this.#status = status;
  }

  get project_id() {
    return this.#project_id;
  }
  get project_name() {
    return this.#project_name;
  }
  get project_desc() {
    return this.#project_desc;
  }
  get project_local() {
    return this.#project_local;
  }
  get begin_date() {
    return this.#begin_date;
  }
  get end_date() {
    return this.#end_date;
  }
  get deadline() {
    return this.#deadline;
  }
  get status() {
    return this.#status;
  }
}
