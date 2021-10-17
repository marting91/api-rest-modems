// Selectores
const vendorSelect = document.querySelector('#vendor');
const tableBody = document.querySelector('#models-table tbody');

document.addEventListener('DOMContentLoaded', () => {
    loadVendors();
});
vendorSelect.addEventListener('change', getModems);
tableBody.addEventListener('click', addModel);

async function addModel(e) {
    const target = e.target.nodeName.toLowerCase()
    if (target === 'svg' || target === 'path') {
        const row = e.target.closest('tr');
        model = {
            vendor: vendorSelect.value,
            name: row.querySelector('td[data-modem="vsi_model"]').textContent,
            soft: row.querySelector('td[data-modem="vsi_swver"]').textContent
        }
        const result = await callApi('POST', `/fabricantes/${vendorSelect.value}/modems`, { 'Content-Type': 'application/json' }, JSON.stringify(model));

        if (!result.msg) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Modelo agregado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: result.msg,
            })
        }
    };
}

async function getModems(e) {
    tableBody.innerHTML = '';
    const vendorSelected = e.target.value;
    const modems = await callApi('GET', `/fabricantes/${vendorSelected}/modems`);

    if (!modems.msg) {
        for (const modem of modems) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-modem="macaddr">${modem.modem_macaddr}</td>
                <td data-modem="ipaddr">${modem.ipaddr}</td>
                <td data-modem="vsi_model">${modem.vsi_model}</td>
                <td data-modem="vsi_swver">${modem.vsi_swver}</td>
                <td class="text-center"><svg role="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.47967 21.994 2.00606 17.5204 2 12V11.8C2.10993 6.30455 6.63459 1.92797 12.1307 2.0009C17.6268 2.07382 22.0337 6.5689 21.9978 12.0654C21.9619 17.5618 17.4966 21.9989 12 22ZM7 11V13H11V17H13V13H17V11H13V7.00002H11V11H7Z" fill="#2E3A59"></path>
                </svg>
                </td>
            `
            tableBody.appendChild(row);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: modems.msg,
        })
    }


}

async function loadVendors() {
    const vendors = await callApi('GET', '/fabricantes');

    if (!vendors.msg) {
        for (const vendor of vendors) {
            const option = document.createElement('option');
            option.textContent = vendor.vsi_vendor;
            option.value = vendor.vsi_vendor;
            vendorSelect.appendChild(option);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: vendors.msg,
        })
    }

}