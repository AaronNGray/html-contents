import process from "node:process";
import { DOMParser } from 'linkedom'
import { Readability } from '@mozilla/readability'

async function main(url) {

    const response = await fetch(url);

    if (!response.ok) {
        console.log("error: error reading file: ", response.status);
        return;
    }

    const html = await response.text();

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const reader = new Readability(doc);
    const result = reader.parse() || {}

    console.log("result = ", result.textContent ? result.content : null);
}

main(process.argv[2]);

