import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const file = resolve("redesign/index.html");
const html = readFileSync(file, "utf8");

const required = [
  ["HTML5 doctype", /^<!doctype html>/i],
  ["responsive viewport", /<meta[^>]+name="viewport"/i],
  ["page title", /<title>[^<]+<\/title>/i],
  ["main landmark", /<main\b[\s\S]*?<\/main>/i],
  ["services section", /id="services"/],
  ["about section", /id="about"/],
  ["capabilities section", /id="capabilities"/],
  ["contact section", /id="contact"/],
  ["mobile navigation", /id="mobilePanel"/],
  ["accessible menu state", /aria-expanded="false"/],
  ["enquiry form", /id="enquiryForm"/],
  ["reduced motion support", /prefers-reduced-motion:\s*reduce/],
  ["email handoff", /mailto:pss122005@gmail\.com/],
  ["original team photography", /alt="Punit Security Services team"/],
  ["service photography", /class="service-image"/],
];

for (const [label, pattern] of required) {
  assert.match(html, pattern, `Missing or invalid: ${label}`);
  console.log(`✓ ${label}`);
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicates)], [], "Duplicate HTML IDs found");

const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const missingAnchors = anchors.filter((id) => !ids.includes(id));
assert.deepEqual([...new Set(missingAnchors)], [], "Broken in-page anchor links found");

const scriptOpen = (html.match(/<script\b/gi) ?? []).length;
const scriptClose = (html.match(/<\/script>/gi) ?? []).length;
assert.equal(scriptOpen, scriptClose, "Unbalanced script tags");

const sectionOpen = (html.match(/<section\b/gi) ?? []).length;
const sectionClose = (html.match(/<\/section>/gi) ?? []).length;
assert.equal(sectionOpen, sectionClose, "Unbalanced section tags");

console.log("\nRedesign preview smoke checks passed.");
