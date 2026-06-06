// Service card variants. At scaffold time, the skill picks ONE variant
// based on the Variation Manifest's `card_variant` field and copies the
// chosen tsx file into the generated project as src/components/ServiceCard.tsx.
//
// Do NOT import this index in the generated project — it imports all 8
// variants at once. The skill copies only the picked file.

export { default as ServiceCardV1 } from "./ServiceCardV1";
export { default as ServiceCardV2 } from "./ServiceCardV2";
export { default as ServiceCardV3 } from "./ServiceCardV3";
export { default as ServiceCardV4 } from "./ServiceCardV4";
export { default as ServiceCardV5 } from "./ServiceCardV5";
export { default as ServiceCardV6 } from "./ServiceCardV6";
export { default as ServiceCardV7, BENTO_LAYOUT } from "./ServiceCardV7";
export { default as ServiceCardV8 } from "./ServiceCardV8";
