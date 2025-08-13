import type { Schema, Struct } from '@strapi/strapi';

export interface AttributesNewItems extends Struct.ComponentSchema {
  collectionName: 'components_attributes_new_items';
  info: {
    displayName: 'newItems';
    icon: 'database';
  };
  attributes: {};
}

export interface ItemsItems extends Struct.ComponentSchema {
  collectionName: 'components_items_items';
  info: {
    displayName: 'items';
    icon: 'briefcase';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ItemsOrderItems extends Struct.ComponentSchema {
  collectionName: 'components_items_order_items';
  info: {
    displayName: 'orderItems';
    icon: 'earth';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface ProductProduct extends Struct.ComponentSchema {
  collectionName: 'components_product_products';
  info: {
    displayName: 'product';
    icon: 'server';
  };
  attributes: {};
}

export interface ProductsInfoInfo extends Struct.ComponentSchema {
  collectionName: 'components_products_info_infos';
  info: {
    displayName: 'info';
    icon: 'priceTag';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
  };
}

export interface ProductsInfoQos extends Struct.ComponentSchema {
  collectionName: 'components_products_info_qos';
  info: {
    displayName: 'qos';
    icon: 'attachment';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'attributes.new-items': AttributesNewItems;
      'items.items': ItemsItems;
      'items.order-items': ItemsOrderItems;
      'product.product': ProductProduct;
      'products-info.info': ProductsInfoInfo;
      'products-info.qos': ProductsInfoQos;
    }
  }
}
