import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';
import './media-collection-toolbar.element.js';
import type { UUIFileDropzoneEvent } from '@umbraco-cms/backoffice/external/uui';
import { UmbTemporaryFileManager, type UmbTemporaryFileQueueModel } from '@umbraco-cms/backoffice/temporary-file';
import { UmbId } from '@umbraco-cms/backoffice/id';

@customElement('umb-media-collection')
export class UmbMediaCollectionElement extends UmbCollectionDefaultElement {
	#fileManager = new UmbTemporaryFileManager(this);

	constructor() {
		super();
		document.addEventListener('dragenter', this.#handleDragEnter.bind(this));
		document.addEventListener('dragleave', this.#handleDragLeave.bind(this));
		document.addEventListener('drop', this.#handleDrop.bind(this));
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		document.removeEventListener('dragenter', this.#handleDragEnter.bind(this));
		document.removeEventListener('dragleave', this.#handleDragLeave.bind(this));
		document.removeEventListener('drop', this.#handleDrop.bind(this));
	}

	#handleDragEnter() {
		this.toggleAttribute('dragging', true);
	}

	#handleDragLeave() {
		this.toggleAttribute('dragging', false);
	}

	#handleDrop(event: DragEvent) {
		event.preventDefault();
		console.log('#handleDrop', event);
		this.toggleAttribute('dragging', false);
	}

	async #onFileUpload(event: UUIFileDropzoneEvent) {
		const files: Array<UmbTemporaryFileQueueModel> = event.detail.files.map((file) => ({ file, unique: UmbId.new() }));
		if (!files.length) return;

		const items = await this.#fileManager.upload(files);
		if (!items.length) return;

		console.log('uploadComplete', items);
	}

	protected renderToolbar() {
		return html`
			<umb-media-collection-toolbar slot="header"></umb-media-collection-toolbar>
			<!-- TODO: Add the Media Upload dropzone component in here. [LK] -->
			<uui-file-dropzone
				id="dropzone"
				multiple
				@change=${this.#onFileUpload}
				label="${this.localize.term('media_dragAndDropYourFilesIntoTheArea')}"
				accept=""></uui-file-dropzone>
		`;
	}

	static styles = [
		css`
			:host([dragging]) #dropzone {
				opacity: 1;
				pointer-events: all;
			}
			[dropzone] {
				opacity: 0;
			}
			#dropzone {
				opacity: 0;
				pointer-events: none;
				display: block;
				position: absolute;
				inset: 0px;
				z-index: 100;
				backdrop-filter: opacity(1); /* Removes the built in blur effect */
				border-radius: var(--uui-border-radius);
				overflow: clip;
				border: 1px solid var(--uui-color-focus);
			}
			#dropzone:after {
				content: '';
				display: block;
				position: absolute;
				inset: 0;
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-focus);
				opacity: 0.2;
			}
		`,
	];
}

export default UmbMediaCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-collection': UmbMediaCollectionElement;
	}
}
