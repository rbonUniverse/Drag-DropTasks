var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-components.js";
import { validate } from "../util/validation.js";
import { Autobind } from "../decorators/Aoutobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    gatherUserInputMethod() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeopleAmount = this.peopleInputElement.value;
        const titleValidable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const poepleValidable = {
            value: +enteredPeopleAmount,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidable) ||
            !validate(descriptionValidable) ||
            !validate(poepleValidable)) {
            alert("Please enter a valid Input!");
            return;
        }
        else {
            const fieldsArray = [
                enteredTitle,
                enteredDescription,
                +enteredPeopleAmount,
            ];
            return fieldsArray;
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInputMethod();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInput();
        }
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map