import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { ValidatorModule } from './validator/validator.module';

const EXPORT_MODULES = [MaterialModule, ValidatorModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...EXPORT_MODULES],
  exports: [EXPORT_MODULES],
})
export class SharedModule {}
