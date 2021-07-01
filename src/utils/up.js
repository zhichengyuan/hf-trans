import axios from 'axios'
export const apiImportCusExcel = (formData, params) => {
	return new Promise((resolve, reject) => {
		instance.post(
			baseApi+'/api/console/customer/customerImport?customerGroupTypeId='+params.customerGroupTypeId+'&importType='+params.importType+'&isSupplementCustomerInfo='+params.isSupplementCustomerInfo+'&seaId='+params.seaId,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		.then(response => {
			resolve(response.data)
		})
		.catch(error => {
			reject(error)
		})
	})
}
