import fs from 'fs';
import path from 'path';

const dirPath = 'c:/Users/ruma2/OneDrive/Desktop/kolkata-startup-map/companies data';
const files = [
  'codex.csv',
  'table.csv',
  'kolkata_startup_directory.csv',
  'expansion_list.csv',
  'directory_analysis.csv',
  'regional_wb.csv',
  'additional_startups.csv',
  'west_bengal_startups_final_current_batch.csv'
];

function parseCSVLine(text) {
  const result = [];
  let cell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cell.trim());
      cell = '';
    } else {
      cell += c;
    }
  }
  result.push(cell.trim());
  return result;
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];
  
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 2) continue;
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    rows.push(row);
  }
  return rows;
}

let rawRecords = [];
for (const file of files) {
  const filePath = path.join(dirPath, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const rows = parseCSV(content);
    console.log(`Read ${rows.length} rows from ${file}`);
    rawRecords = rawRecords.concat(rows);
  }
}

function normalizeName(name) {
  return name.toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/foods|mobility|group|labs|techsoft|technologies|solutions|services|india|limited|pvt|ltd|llp|opc/gi, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function mapType(rawType) {
  const t = (rawType || '').toLowerCase();
  if (t.includes('vc') || t.includes('investor') || t.includes('capital') || t.includes('angel')) return 'vc';
  if (t.includes('incubator') || t.includes('hub') || t.includes('warehouse') || t.includes('council')) return 'ecosystem';
  return 'startup';
}

function mapSector(rawSector) {
  const s = (rawSector || '').toLowerCase();
  if (s.includes('ai') || s.includes('ml') || s.includes('vision') || s.includes('ar vr')) return 'ai';
  if (s.includes('d2c') || s.includes('fashion') || s.includes('textile') || s.includes('retail') || s.includes('apparel')) return 'd2c';
  if (s.includes('fintech') || s.includes('finance') || s.includes('microfinance')) return 'fintech';
  if (s.includes('saas') || s.includes('b2b marketplace') || s.includes('crm') || s.includes('it services') || s.includes('enterprise')) return 'saas';
  if (s.includes('deeptech') || s.includes('hardtech') || s.includes('robotics') || s.includes('satellite') || s.includes('climate') || s.includes('renewable') || s.includes('hardware') || s.includes('defense') || s.includes('aerospace')) return 'deeptech';
  if (s.includes('health') || s.includes('pharma') || s.includes('life') || s.includes('bio')) return 'healthtech';
  if (s.includes('edtech') || s.includes('education')) return 'edtech';
  if (s.includes('gaming') || s.includes('esports')) return 'gaming';
  if (s.includes('logistics') || s.includes('transport') || s.includes('freight') || s.includes('auto')) return 'logistics';
  if (s.includes('consumer') || s.includes('qsr') || s.includes('food') || s.includes('beverage') || s.includes('agri')) return 'consumer';
  return 'other';
}

function mapStage(rawStage) {
  const st = (rawStage || '').toLowerCase();
  if (st.includes('series c')) return 'series-c+';
  if (st.includes('series b') || st.includes('scaling')) return 'series-b';
  if (st.includes('series a') || st.includes('early traction')) return 'series-a';
  if (st.includes('pre-seed') || st.includes('ideation')) return 'pre-seed';
  if (st.includes('seed') || st.includes('validation')) return 'seed';
  if (st.includes('bootstrapped')) return 'bootstrapped';
  if (st.includes('acquired')) return 'acquired';
  if (st.includes('public')) return 'public';
  return 'bootstrapped';
}

function mapArea(rawArea) {
  const a = (rawArea || '').toLowerCase();
  if (a.includes('salt lake') || a.includes('sector v')) return 'salt-lake';
  if (a.includes('new town') || a.includes('rajarhat')) return 'new-town';
  if (a.includes('park street') || a.includes('camac')) return 'park-street';
  if (a.includes('ballygunge') || a.includes('gariahat')) return 'ballygunge';
  if (a.includes('alipore')) return 'alipore';
  if (a.includes('behala')) return 'behala';
  if (a.includes('howrah')) return 'howrah';
  if (a.includes('dum dum')) return 'dum-dum';
  if (a.includes('garia')) return 'garia';
  if (a.includes('jadavpur') || a.includes('joka')) return 'jadavpur';
  if (a.includes('em bypass')) return 'em-bypass';
  if (a.includes('siliguri')) return 'siliguri';
  if (a.includes('durgapur') || a.includes('asansol') || a.includes('bardhaman')) return 'durgapur';
  if (a.includes('kharagpur')) return 'kharagpur';
  if (a.includes('darjeeling') || a.includes('kalimpong')) return 'darjeeling';
  if (a.includes('jalpaiguri') || a.includes('alipurduar') || a.includes('cooch behar')) return 'jalpaiguri';
  if (a.includes('hooghly')) return 'hooghly';
  return 'other';
}

const areaCoordinates = {
  'salt-lake': { lat: 22.5726, lng: 88.4331 },
  'new-town': { lat: 22.5899, lng: 88.4688 },
  'park-street': { lat: 22.5521, lng: 88.3534 },
  'ballygunge': { lat: 22.5268, lng: 88.3694 },
  'alipore': { lat: 22.5345, lng: 88.3389 },
  'behala': { lat: 22.4982, lng: 88.3154 },
  'howrah': { lat: 22.5892, lng: 88.3298 },
  'dum-dum': { lat: 22.6289, lng: 88.4198 },
  'garia': { lat: 22.4682, lng: 88.3892 },
  'jadavpur': { lat: 22.4991, lng: 88.3685 },
  'em-bypass': { lat: 22.5284, lng: 88.3982 },
  'siliguri': { lat: 26.7271, lng: 88.3953 },
  'durgapur': { lat: 23.5204, lng: 87.3119 },
  'kharagpur': { lat: 22.3460, lng: 87.2320 },
  'darjeeling': { lat: 27.0410, lng: 88.2660 },
  'jalpaiguri': { lat: 26.5400, lng: 88.7190 },
  'hooghly': { lat: 22.9030, lng: 88.3970 },
  'other': { lat: 22.5400, lng: 88.3600 }
};

const companyMap = new Map();
let indexCounter = 1;

for (const record of rawRecords) {
  const name = record.Name ? record.Name.trim() : '';
  if (!name) continue;

  const normKey = normalizeName(name);

  const rawStage = record['DPIIT Stage'] || record.Stage || 'Bootstrapped';
  const rawArea = record['District / City'] || record.Area || 'Kolkata';
  const rawSector = record['Focus Industry'] || record.Sector || 'Other';
  let website = (record['Startup India Profile'] || record.Website || '').trim();

  if (companyMap.has(normKey)) {
    const existing = companyMap.get(normKey);
    if (!existing.website && website && website.startsWith('http')) {
      existing.website = website;
    }
    if ((!existing.description || existing.description.length < 15) && record.Description) {
      existing.description = record.Description.trim();
    }
    if (existing.stage === 'bootstrapped' && rawStage && rawStage !== 'Unconfirmed' && rawStage !== 'N/A') {
      existing.stage = mapStage(rawStage);
    }
    continue;
  }

  let area = mapArea(rawArea);
  if (area === 'other') {
    const kolkataAreas = ['salt-lake', 'new-town', 'park-street', 'ballygunge', 'alipore', 'jadavpur', 'em-bypass', 'howrah'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    area = kolkataAreas[hash % kolkataAreas.length];
  }
  const center = areaCoordinates[area] || areaCoordinates['salt-lake'];

  const lat = parseFloat((center.lat + (Math.random() - 0.5) * 0.032).toFixed(4));
  const lng = parseFloat((center.lng + (Math.random() - 0.5) * 0.032).toFixed(4));

  if (
    website.includes('[VERIFY') ||
    website.includes('(ecosystem') ||
    website.includes('startupindia.gov.in')
  ) {
    website = '';
  }

  const cleanName = name.replace(/\s+/g, ' ');
  const firstLetter = cleanName.charAt(0).toUpperCase();

  const descriptionText = record.Description 
    ? record.Description.trim() 
    : `${cleanName} is a DPIIT recognized ${rawSector} venture at ${rawStage} stage based in ${rawArea}, West Bengal.`;

  const formattedRecord = {
    id: `kol-${String(indexCounter).padStart(3, '0')}`,
    name: cleanName,
    type: mapType(record.Type),
    sector: mapSector(rawSector),
    stage: mapStage(rawStage),
    area: area,
    lat: lat,
    lng: lng,
    website: website,
    logoUrl: "",
    colorSeed: firstLetter,
    description: descriptionText
  };

  indexCounter++;
  companyMap.set(normKey, formattedRecord);
}

const finalStartups = Array.from(companyMap.values());
console.log(`Combined & deduplicated to ${finalStartups.length} unique companies.`);

fs.writeFileSync(
  'c:/Users/ruma2/OneDrive/Desktop/kolkata-startup-map/src/data/startups.json',
  JSON.stringify(finalStartups, null, 2),
  'utf-8'
);

console.log('Successfully updated src/data/startups.json!');
