import { Component } from "./base-components.js";
import { Validatable, validate } from "../util/validation.js";
import { Autobind } from "../decorators/Aoutobind.js";
import { projectState } from "../state/project-state.js";

// Project Input Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  // Get the values from the Inputs
  private gatherUserInputMethod(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeopleAmount = this.peopleInputElement.value;

    const titleValidable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const poepleValidable: Validatable = {
      value: +enteredPeopleAmount,
      required: true,
      min: 1,
      max: 5,
    };

    // Validation
    if (
      !validate(titleValidable) ||
      !validate(descriptionValidable) ||
      !validate(poepleValidable)
    ) {
      alert("Please enter a valid Input!");
      return;
    } else {
      const fieldsArray: [string, string, number] = [
        enteredTitle,
        enteredDescription,
        +enteredPeopleAmount,
      ];
      return fieldsArray;
    }
  }

  // Clear Inputs
  private clearInput(): void {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  // Autobind decorator
  @Autobind
  // Submit form
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInputMethod();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      // Call the clearInput
      this.clearInput();
    }
  }
}
