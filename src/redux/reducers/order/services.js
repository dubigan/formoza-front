import { ADD_SERVICE, DEL_SERVICE, CHANGE_SERVICE, CHANGE_DISCOUNT } from '../../actions/types';

const emptyService = id => {
  return {
    id: -1,
    mnt_type: -1,
    summa: 0,
    comment: '',
    status: 'wm',
    order: id,
  };
};

const getPriceForMntType = (state, mnt_type, catalogs) => {
  if (state.item.id > -1) {
    const item_type = catalogs.item_types.find(type => {
      return +type.id === +state.item.item_type;
    });
    if (item_type !== undefined) {
      const mnt = catalogs.mnt_types.find(type => +mnt_type === +type.id);
      //console.log("getSumma item_type", item_type);
      //console.log("getSumma mnt", mnt);
      return mnt ? mnt.price : 0;
    }
  }
  return 0;
};

export default function (state, action) {
  let name, index;
  switch (action.type) {
    case ADD_SERVICE: {
      const services = state.order.mnts;
      services.push(emptyService(state.order.id));
      //console.log('addService.reducer.services', services);
      return {
        ...state,
        order: {
          ...state.order,
          mnts: services,
        },
      };
    }

    case DEL_SERVICE:
      //console.log("Service removed");
      name = action.payload.name;
      index = +name.slice(name.lastIndexOf('-') + 1, name.length);
      //console.log('delService.reducer.index', index);

      const services = state.order.mnts;
      if (services.length > 0) services.splice(index, 1);
      console.log('delService.reducer.services', services);

      return {
        ...state,
        order: {
          ...state.order,
          mnts: services,
        },
      };

    case CHANGE_SERVICE: {
      //console.log("Service changed");
      name = action.payload.name;
      index = +name.slice(name.lastIndexOf('-') + 1, name.length);
      name = name.slice(0, name.lastIndexOf('-'));
      //console.log("changeService", name, index);
      //console.log(index);
      const services = state.order.mnts;
      //console.log("changeService", services);
      switch (name) {
        case 'service':
          services[index].mnt_type = action.payload.value;
          services[index].summa = getPriceForMntType(
            state,
            action.payload.value,
            action.payload.catalogs
          );
          break;
        default: {
          services[index][name] = action.payload.value;
        }
      }
      //console.log("changeService", services);
      return {
        ...state,
        order: {
          ...state.order,
          mnts: services,
        },
      };
    }
    case CHANGE_DISCOUNT:
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.name]: action.payload.value,
        },
      };
  }
  return state;
}
