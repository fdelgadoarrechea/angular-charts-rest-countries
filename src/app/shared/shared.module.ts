import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppMaterialModule } from "src/app/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

// Layout
import { MainNavComponent } from "./layout/main-nav/main-nav.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SideNavComponent } from "./layout/side-nav/side-nav.component";
import { MySelectionComponent } from "./layout/my-selection/my-selection.component";

// Widgets
import { DatePickerComponent } from "./widgets/date-picker/date-picker.component";
import { EntitySelectorComponent } from "./widgets/entity-selector/entity-selector.component";
import { TemporalSelectorComponent } from "./widgets/temporal-selector/temporal-selector.component";
import { KpiSelectorComponent } from "./widgets/kpi-selector/kpi-selector.component";

@NgModule({
  imports: [
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    MainNavComponent,
    FooterComponent,
    SideNavComponent,
    MySelectionComponent,
    DatePickerComponent,
    EntitySelectorComponent,
    TemporalSelectorComponent,
    KpiSelectorComponent
  ],
  declarations: [
    MainNavComponent,
    FooterComponent,
    SideNavComponent,
    MySelectionComponent,
    DatePickerComponent,
    EntitySelectorComponent,
    TemporalSelectorComponent,
    KpiSelectorComponent
  ]
})
export class SharedModule {}
