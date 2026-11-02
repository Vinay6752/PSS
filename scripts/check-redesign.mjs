import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const html = readFileSync(resolve("redesign/index.html"), "utf8");

const required = [
  ["HTML5 doctype", /^<!doctype html>/i],
  ["responsive viewport", /<meta[^>]+name="viewport"/i],
  ["page title", /<title>[^<]+<\/title>/i],
  ["main landmark", /<main\b[\s\S]*?<\/main>/i],
  ["about section", /id="about"/],
  ["services section", /id="services"/],
  ["industries section", /id="industries"/],
  ["why choose us section", /id="why"/],
  ["gallery section", /id="gallery"/],
  ["how we work section", /id="process"/],
  ["contact section", /id="contact"/],
  ["mobile navigation", /id="mobileNav"/],
  ["accessible menu state", /aria-expanded="false"/],
  ["original team photography", /alt="Punit Security Services team"/],
  ["reduced motion support", /prefers-reduced-motion:\s*reduce/],
  ["correct email contact", /mailto:pss122005@gmail\.com/],
  ["correct control room contact", /tel:\+919145314000/],
  ["correct second phone contact", /tel:\+917497897879/],
  ["licence reference", /PSAL\/L\/58\/HR\/2026\/PSP\/2\/1829/],
  ["24-hour control room", /Control room: 24 hours/],
];

for (const [label, pattern] of required) {
  assert.match(html, pattern, `Missing or invalid: ${label}`);
  console.log(`✓ ${label}`);
}

assert.doesNotMatch(html, /id="enquiryForm"|<form\b/i, "This design should not include an enquiry form");

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

console.log("\nPSS reference redesign smoke checks passed.");
