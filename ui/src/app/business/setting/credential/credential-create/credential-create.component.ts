import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CredentialCreateRequest} from '../credential';
import {NgForm} from '@angular/forms';
import {CredentialService} from '../credential.service';
import {AlertLevels} from '../../../../layout/common-alert/alert';
import {ModalAlertService} from '../../../../shared/common-component/modal-alert/modal-alert.service';
import {CommonAlertService} from '../../../../layout/common-alert/common-alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-credential-create',
    templateUrl: './credential-create.component.html',
    styleUrls: ['./credential-create.component.css']
})
export class CredentialCreateComponent implements OnInit {

    opened = false;
    isSubmitGoing = false;
    item: CredentialCreateRequest = new CredentialCreateRequest();
    @ViewChild('credentialForm') credentialForm: NgForm;
    @Output() created = new EventEmitter();

    constructor(private service: CredentialService, private modalAlertService: ModalAlertService,
                private commonAlertService: CommonAlertService, private translateService: TranslateService) {
    }

    ngOnInit(): void {
    }

    open() {
        this.item = new CredentialCreateRequest();
        this.credentialForm.resetForm();
        this.opened = true;
        this.item.type = 'password';
    }

    onCancel() {
        this.opened = false;
    }

    onSubmit() {
        this.isSubmitGoing = true;
        this.service.create(this.item).subscribe(data => {
            this.opened = false;
            this.isSubmitGoing = false;
            this.created.emit();
            this.commonAlertService.showAlert(this.translateService.instant('APP_ADD_SUCCESS'), AlertLevels.SUCCESS);
        }, error => {
            this.modalAlertService.showAlert(error.msg, AlertLevels.ERROR);
        });
    }
}
