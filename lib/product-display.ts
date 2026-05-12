export const PRODUCT_DISPLAY_NAMES = {
  laser: "Laser",
  "laser-scanner": "Laser Scanner",
  "laser-metrology": "Laser Metrology",
  "beam-shaping": "Beam Shaping",
  optics: "Optics",
  "beam-delivery": "Beam Delivery",
  "optical-solution": "Optical Solution",
} as const;

export function getProductDisplayName(slug: string, fallback: string) {
  return PRODUCT_DISPLAY_NAMES[slug as keyof typeof PRODUCT_DISPLAY_NAMES] ?? fallback;
}
