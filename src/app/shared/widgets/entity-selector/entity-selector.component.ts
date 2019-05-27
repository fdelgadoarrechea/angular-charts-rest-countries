import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

export interface Entity {
  id: number;
  code: string;
  name: string;
  type: string;
}

@Component({
  selector: "app-entity-selector",
  templateUrl: "./entity-selector.component.html",
  styleUrls: ["./entity-selector.component.css"]
})
export class EntitySelectorComponent implements OnInit {
  @Input()
  selectedEntity: number;
  @Input()
  availableEntities: Entity[];
  @Input()
  entityPlaceholder: string;
  @Input()
  options: any;
  @Input()
  allowNone: boolean;
  @Output()
  entityChange = new EventEmitter<number>();

  entitiesControl: any;
  entities: Entity[];
  selected: number;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.entities = this.availableEntities;
    this.entitiesControl = new FormControl(this.selectedEntity, [
      Validators.minLength(3)
    ]);
    if (!this.options.enabled) {
      this.entitiesControl.disable();
    }
  }

  onChange() {
    this.entityChange.emit(this.entitiesControl.value);
  }
}
