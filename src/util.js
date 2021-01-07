export const mapSearchResults = (d) => ({
  id: d.id,
  barcode: d.id,
  name: d.item_name,
  kiloAble: d.kiloable,
  sacks: d.item_kilos.map((ik) => ({sackId: ik.id, sackLabel: ik.label, sackValue: ik.value})),
  suppliers: d.suppliers.map((s) => ({
    id: s.id,
    supplierName: s.supplier_name,
  })),
  price: d.price,
});
