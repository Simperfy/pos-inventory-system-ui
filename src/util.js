export const mapSearchResults = (d) => ({
  id: d.id.toString(),
  barcode: d.id.toString(),
  name: `${d.item_group.item_name} ${d.unit_of_measurement} (${d.unit_of_measurement_value} KG)`,
  kiloAble: false,
  // sacks: d.item_kilos.map((ik) => ({sackId: ik.id.toString(), sackLabel: ik.label, sackValue: ik.value, sackPrice: ik.price})),
  sacks: [],
  suppliers: d.suppliers.map((s) => ({
    id: s.id.toString(),
    supplierName: s.supplier_name,
  })),
  price: d.price,
  remaining: d.remaining,
});

export const mapSacks = (s) => ({id: s.sackId.toString(), name: s.sackLabel, value: s.sackValue, price: s.sackPrice});

const checkRemaining = (remaining) => remaining > 0;

export const isValidQuantity = (remaining, quantity) => (checkRemaining(remaining) && quantity <= remaining) || isNaN(quantity);
