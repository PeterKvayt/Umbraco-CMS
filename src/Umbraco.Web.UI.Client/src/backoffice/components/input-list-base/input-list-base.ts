import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIModalSidebarSize } from '@umbraco-ui/uui-modal-sidebar';
import { UmbPickerData } from '../../../core/services/modal/layouts/modal-layout-picker-base';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';

//TODO: These should probably be imported dynamically.
import '../input-section/picker-layout-section.element';
import '../input-user-group/picker-layout-user-group.element';
import '../input-user/picker-layout-user.element';
import { UmbModalService, UmbModalType } from '@umbraco-cms/services';

/** TODO: Make use of UUI FORM Mixin, to make it easily take part of a form. */
export class UmbInputListBase extends UmbContextConsumerMixin(LitElement) {

	@property({ type: Array })
	public value: Array<string> = [];

	@property({ type: Boolean })
	public multiple = true;

	@property({ type: String })
	public modalType: UmbModalType = 'sidebar';

	@property({ type: String })
	public modalSize: UUIModalSidebarSize = 'small';

	protected pickerLayout?: string;
	private _modalService?: UmbModalService;

	constructor() {
		super();
		this.consumeContext('umbModalService', (modalService: UmbModalService) => {
			this._modalService = modalService;
		});
	}

	private _openPicker() {
		if (!this.pickerLayout) return;

		const modalHandler = this._modalService?.open(this.pickerLayout, {
			type: this.modalType,
			size: this.modalSize,
			data: {
				multiple: this.multiple,
				selection: this.value,
			},
		});
		modalHandler?.onClose().then((data: UmbPickerData<string>) => {
			if (data) {
				this.value = data.selection;
				this.selectionUpdated();
			}
		});
	}

	protected removeFromSelection(key: string) {
		this.value = this.value.filter((k) => k !== key);
		this.selectionUpdated();
	}

	protected selectionUpdated() {
		// override this method to react to selection changes
	}

	protected renderButton() {
		return html`<uui-button id="add-button" look="placeholder" @click=${this._openPicker} label="open">
			Add
		</uui-button>`;
	}
	protected renderContent() {
		return html``;
	}

	render() {
		return html`${this.renderContent()}${this.renderButton()}`;
	}
}
