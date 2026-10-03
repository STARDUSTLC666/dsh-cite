import { readFileSync, writeFileSync } from 'node:fs'
writeFileSync('lib/client.js', readFileSync('templates/client.js', 'utf8'))
