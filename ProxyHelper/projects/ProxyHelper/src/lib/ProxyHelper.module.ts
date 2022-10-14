import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProxyHelperComponent } from './components/ProxyHelper.component';
import { RouterModule, Routes } from '@angular/router';

import {MaterialModule} from './modules/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {FormsModule} from '@angular/forms';

const routes: Routes = [
    { path: '', component: ProxyHelperComponent }
];

@NgModule({
    declarations: [ProxyHelperComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    exports: [ProxyHelperComponent]
})
export class ProxyHelperModule { }
