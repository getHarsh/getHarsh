/**
 * TypeScript definitions for EnhancedEcommerce
 *
 * Generated from: EnhancedEcommerce.schema.json
 * Generated on: 2025-08-16T20:49:13.725Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EnhancedEcommerce configuration
 */
export interface ENHANCEDECOMMERCEConfigurationSchema {
  /**
   * Enable enhanced ecommerce
   */
  enabled?: boolean;
  /**
   * Data layer version (GA4 or UA)
   */
  data_layer_version?: string;
  /**
   * Currency code
   */
  currency_code?: string;
  products?: ProductTracking;
  cart?: CartTracking;
  checkout?: CheckoutTracking;
  purchase?: PurchaseTracking;
  refunds?: RefundTracking;
  promotions?: PromotionTracking;
}
/**
 * Product tracking
 */
export interface ProductTracking {
  /**
   * Track product impressions
   */
  track_impressions?: boolean;
  /**
   * Track product clicks
   */
  track_clicks?: boolean;
  /**
   * Track product details
   */
  track_details?: boolean;
  /**
   * Product list names
   */
  list_names?: {
    [k: string]: string;
  };
}
/**
 * Cart tracking
 */
export interface CartTracking {
  /**
   * Track add to cart
   */
  track_add_to_cart?: boolean;
  /**
   * Track remove from cart
   */
  track_remove_from_cart?: boolean;
  /**
   * Track cart views
   */
  track_cart_views?: boolean;
}
/**
 * Checkout tracking
 */
export interface CheckoutTracking {
  /**
   * Track checkout steps
   */
  track_steps?: boolean;
  /**
   * Checkout step names
   */
  step_names?: string[];
  /**
   * Track checkout options
   */
  track_options?: boolean;
}
/**
 * Purchase tracking
 */
export interface PurchaseTracking {
  /**
   * Track purchases
   */
  enabled?: boolean;
  /**
   * Include transaction details
   */
  include_transaction_details?: boolean;
  /**
   * Include product details
   */
  include_product_details?: boolean;
}
/**
 * Refund tracking
 */
export interface RefundTracking {
  /**
   * Track full refunds
   */
  track_full_refunds?: boolean;
  /**
   * Track partial refunds
   */
  track_partial_refunds?: boolean;
}
/**
 * Promotion tracking
 */
export interface PromotionTracking {
  /**
   * Track promotion impressions
   */
  track_impressions?: boolean;
  /**
   * Track promotion clicks
   */
  track_clicks?: boolean;
}
