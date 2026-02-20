import type { Schema, Struct } from '@strapi/strapi';

export interface HomeMethodItem extends Struct.ComponentSchema {
  collectionName: 'components_home_method_items';
  info: {
    description: "Um item do bloco 'Como atuamos' na home";
    displayName: 'MethodItem';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.method-item': HomeMethodItem;
    }
  }
}
