import { UmbUserRepositoryBase } from '../user-repository-base.js';
import { UmbNewUserPasswordServerDataSource as UmbNewUserPasswordServerDataSource } from './new-user-password.server.data-source.js';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

/**
 * A repository for generating and assigning a new password for a user
 * @export
 * @class UmbNewUserPasswordRepository
 * @extends {UmbUserRepositoryBase}
 */
export class UmbNewUserPasswordRepository extends UmbUserRepositoryBase {
	dataSource: UmbNewUserPasswordServerDataSource;

	/**
	 * Creates an instance of UmbNewUserPasswordRepository.
	 * @param {UmbControllerHost} host
	 * @memberof UmbNewUserPasswordRepository
	 */
	constructor(host: UmbControllerHost) {
		super(host);
		this.dataSource = new UmbNewUserPasswordServerDataSource(host);
	}

	/**
	 * Request a new password for a user
	 * @param {string} userUnique
	 * @return {*}
	 * @memberof UmbNewUserPasswordRepository
	 */
	async requestNewPassword(userUnique: string) {
		if (!userUnique) throw new Error('User unique is missing');
		await this.init;
		return this.dataSource.newPassword(userUnique);
	}
}

export default UmbNewUserPasswordRepository;
