import { Draggable } from "../models/drag-drop";
import { Project } from "../models/projects";
import { Component } from "./base-components";
import { Autobind } from "../decorators/autobind";

// Project Item Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer.setData("text/plain", this.project.id);
    event.dataTransfer.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent) {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2").textContent = this.project.title;
    this.element.querySelector("h3").textContent = `${this.persons} assigned`;
    this.element.querySelector("p").textContent = this.project.description;
  }
}