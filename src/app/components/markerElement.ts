export function createMarkerElement(country: string, count: number) {
  const el = document.createElement('div');
  const countText = document.createElement('p');
  const chingusText = document.createElement('p');
  const countryText = document.createElement('p');

  // --- 1. Calculate base size from country name length ---
  const charCount = country.length;
  const baseSize = Math.max(50, charCount * 4); // ~4px per character, minimum 50px

  // --- 2. Add logarithmic scaling for population ---
  const scale = Math.log(count + 1);
  const size = baseSize + scale * 15;

  // --- 3. Dynamic sizing based on size ---
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.padding = '8px';

  // --- 4. Random background color ---
  // el.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  el.style.backgroundColor = `var(--color-chingu-green-100)`;

  // --- 5. Visual styling ---
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.borderRadius = '50%';
  el.style.color = '#000';
  el.style.fontSize = '12px';
  el.style.fontWeight = 'bold';
  el.style.textAlign = 'center';
  el.style.overflow = 'hidden';

  // --- 6. Text styling ---
  countText.style.fontSize = '16px';
  countText.style.lineHeight = '1.2';
  countText.style.margin = '0';
  countText.textContent = String(count);

  chingusText.style.fontSize = '10px';
  chingusText.style.lineHeight = '1.2';
  chingusText.style.margin = '0';
  chingusText.textContent = count > 1 ? 'Chingus' : 'Chingu';
  chingusText.style.paddingBottom = '4px';

  countryText.style.fontSize = '9px';
  countryText.style.fontWeight = '400';
  countryText.style.lineHeight = '1.2';
  countryText.style.margin = '0';
  countryText.style.wordBreak = 'break-word';
  countryText.style.hyphens = 'auto';
  countryText.style.whiteSpace = 'normal';
  countryText.style.maxWidth = '100%';
  countryText.textContent = country;

  el.appendChild(countText);
  el.appendChild(chingusText);
  el.appendChild(countryText);

  return el;
}
