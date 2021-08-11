const _id = new WeakMap();
const _name = new WeakMap();
const _description = new WeakMap();
const _price = new WeakMap();
const _rating = new WeakMap();
const _imgUrl = new WeakMap();
const _model = new WeakMap();
const _vendor = new WeakMap();
const _vendorUrl = new WeakMap();

export class Product {
  constructor(
    id,
    name,
    description,
    price,
    rating,
    imgUrl,
    model,
    vendor,
    vendorUrl
  ) {
    _id.set(this, id);
    _name.set(this, name);
    _description.set(this, description);
    _price.set(this, price);
    _rating.set(this, rating);
    _imgUrl.set(this, imgUrl);
    _model.set(this, model);
    _vendor.set(this, vendor);
    _vendorUrl.set(this, vendorUrl);
  }

  get id() {
    return _id.get(this);
  }

  get name() {
    return _name.get(this);
  }

  get description() {
    return _description.get(this);
  }

  get price() {
    return _price.get(this);
  }
  get rating() {
    return _rating.get(this);
  }
  get imgUrl() {
    return _imgUrl.get(this);
  }
  get model() {
    return _model.get(this);
  }

  get vendor() {
    return _vendor.get(this);
  }

  get vendorUrl() {
    return _vendorUrl.get(this);
  }
}
