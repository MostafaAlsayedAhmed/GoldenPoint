import type { Schema, Struct } from '@strapi/strapi';

export interface ToursTrip extends Struct.ComponentSchema {
  collectionName: 'components_tours_trips';
  info: {
    displayName: 'trip';
    icon: 'crown';
  };
  attributes: {
    days: Schema.Attribute.Integer;
    end_date: Schema.Attribute.Date;
    price: Schema.Attribute.Decimal;
    start_date: Schema.Attribute.Date;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tours.trip': ToursTrip;
    }
  }
}
