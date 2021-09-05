export const catalogsUrl = '/sc/api/catalogs/';

export const getValueFromCatalog = (catalog: any, id: number | string, fieldName: string) => {
  const item = catalog.find((c: any) => +c.id === +id);
  return item[fieldName];
};

export const getCatalogsFromData = (data: any) => {
  return {
    item_types: data.item_types,
    manufacturers: data.manufacturers,
    mnt_types: data.mnt_types,
  };
};
