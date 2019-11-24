const sketch = require('sketch');
const { DataSupplier } = sketch;
const util = require('util');
const faker = require('faker');

export function onStartup() {
    DataSupplier.registerDataSupplier('public.text', 'name', 'SupplyDataName');
    DataSupplier.registerDataSupplier('public.text', 'phone', 'SupplyDataPhone');
    DataSupplier.registerDataSupplier('public.text', 'email', 'SupplyDataEmail');
    DataSupplier.registerDataSupplier('public.text', 'address', 'SupplyDataAddress');
}

export function onShutdown() {
    DataSupplier.deregisterDataSuppliers()
}

export function onSupplyDataName(context) {
  commonSupplyDataByType(context, 'name');
}

export function onSupplyDataPhone(context) {
  commonSupplyDataByType(context, 'phone');
}

export function onSupplyDataEmail(context) {
  commonSupplyDataByType(context, 'email');
}

export function onSupplyDataAddress(context) {
  commonSupplyDataByType(context, 'address');
}

function commonSupplyDataByType(context, type) {
    let dataKey = context.data.key;
    const items = util.toArray(context.data.items).map(sketch.fromNative);
    items.forEach((item, index) => {
        let data = '';
        switch (type) {
            case 'name':
                data = faker.name.findName();
                break;
            case 'phone':
                data = faker.phone.phoneNumber();
                break;
            case 'email':
                data = faker.internet.email();
                break;
            case 'address':
                data = faker.address.streetAddress();
                break;
        }
        DataSupplier.supplyDataAtIndex(dataKey, data, index);
    })
}
