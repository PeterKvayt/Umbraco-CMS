import { css, html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { UmbWorkspaceDocumentTypeContext } from '../../document-type-workspace.context';
import { UmbLitElement } from '@umbraco-cms/element';
import type { DocumentTypeModel } from '@umbraco-cms/backend-api';
import '../../../../../shared/property-creator/property-creator.element.ts';

@customElement('umb-workspace-view-document-type-listview')
export class UmbWorkspaceViewDocumentTypeListviewElement extends UmbLitElement {
	static styles = [UUITextStyles, css``];

	@state()
	_documentType?: DocumentTypeModel;

	private _workspaceContext?: UmbWorkspaceDocumentTypeContext;

	constructor() {
		super();

		// TODO: Figure out if this is the best way to consume the context or if it can be strongly typed with an UmbContextToken
		this.consumeContext<UmbWorkspaceDocumentTypeContext>('umbWorkspaceContext', (documentTypeContext) => {
			this._workspaceContext = documentTypeContext;
			this._observeDocumentType();
		});
	}

	private _observeDocumentType() {
		if (!this._workspaceContext) return;

		this.observe(this._workspaceContext.data, (documentType) => {
			this._documentType = documentType;
		});
	}

	render() {
		//this._documentType?.name
		return html` Listview `;
	}
}

export default UmbWorkspaceViewDocumentTypeListviewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-view-document-type-listview': UmbWorkspaceViewDocumentTypeListviewElement;
	}
}
