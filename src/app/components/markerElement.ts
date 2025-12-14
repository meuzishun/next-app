// Data-driven radius scaling (similar to your reference image)
const radiusStops = [
  { count: 1, radius: 10 }, // 5px radius
  { count: 5, radius: 15 }, // 8px radius
  { count: 20, radius: 25 }, // 13px radius
  { count: 50, radius: 35 }, // 20px radius
  { count: 100, radius: 50 }, // 30px radius
  { count: 150, radius: 65 }, // 45px radius
  { count: 300, radius: 80 }, // 60px radius
  { count: 600, radius: 95 }, // 75px radius
  { count: 1000, radius: 110 }, // 85px radius
  { count: 2000, radius: 130 }, // 100px radius
];

// Data-driven color stops (matching your reference image)
const colorStops = [
  { count: 1, color: '#b64fff' }, // Purple for smallest values
  { count: 5, color: '#b64fff' },
  { count: 20, color: '#b64fff' },
  { count: 50, color: '#40b8f5' }, // Cyan/Blue for medium values
  { count: 100, color: '#40b8f5' },
  { count: 150, color: '#40b8f5' },
  { count: 300, color: '#0fe18b' }, // Green for highest values
  { count: 600, color: '#0fe18b' },
  { count: 2000, color: '#0fe18b' },
];

// Linear interpolation function for radius
function interpolate(count: number): number {
  // If count is below minimum, return minimum radius
  if (count <= radiusStops[0].count) {
    return radiusStops[0].radius;
  }

  // If count is above maximum, return maximum radius
  if (count >= radiusStops[radiusStops.length - 1].count) {
    return radiusStops[radiusStops.length - 1].radius;
  }

  // Find the two stops to interpolate between
  for (let i = 0; i < radiusStops.length - 1; i++) {
    const current = radiusStops[i];
    const next = radiusStops[i + 1];

    if (count >= current.count && count <= next.count) {
      // Linear interpolation
      const ratio = (count - current.count) / (next.count - current.count);
      return current.radius + ratio * (next.radius - current.radius);
    }
  }

  return radiusStops[0].radius; // fallback
}

// Stepped color function (matching your reference image)
function getColor(count: number): string {
  // Find the appropriate color step
  for (let i = colorStops.length - 1; i >= 0; i--) {
    if (count >= colorStops[i].count) {
      return colorStops[i].color;
    }
  }

  // Fallback to first color
  return colorStops[0].color;
}

export function createMarkerElement(
  country: string,
  count: number,
  zoom: number = 1.5
) {
  const el = document.createElement('div');
  const countCircle = document.createElement('div');
  const countText = document.createElement('p');
  const countryText = document.createElement('p');

  // Add data attribute to country text for easy reference
  countryText.setAttribute('data-country-text', 'true');

  // --- 1. Data-driven radius and color calculation ---
  const radius = interpolate(count);
  const size = radius * 2; // diameter = radius * 2
  const backgroundColor = getColor(count);

  // --- 2. Dynamic sizing based on data ---
  countCircle.style.width = `${size}px`;
  countCircle.style.height = `${size}px`;
  countCircle.style.padding = '8px';

  // --- 3. Data-driven background color and z-index ---
  countCircle.style.backgroundColor = backgroundColor;

  // Map radius to z-index - each radius range gets its own layer
  let zIndex = 1; // Default for smallest
  if (radius >= 130) zIndex = 10;
  else if (radius >= 110) zIndex = 9;
  else if (radius >= 95) zIndex = 8;
  else if (radius >= 80) zIndex = 7;
  else if (radius >= 65) zIndex = 6;
  else if (radius >= 50) zIndex = 5;
  else if (radius >= 35) zIndex = 4;
  else if (radius >= 25) zIndex = 3;
  else if (radius >= 15) zIndex = 2;
  // radius < 15 stays at zIndex = 1

  el.style.zIndex = String(zIndex);

  // --- 4. Visual styling ---
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  countCircle.style.display = 'flex';
  countCircle.style.flexDirection = 'column';
  countCircle.style.alignItems = 'center';
  countCircle.style.justifyContent = 'center';
  countCircle.style.borderRadius = '50%';
  countCircle.style.color = '#000';
  countCircle.style.fontSize = '12px';
  countCircle.style.fontWeight = 'bold';
  countCircle.style.textAlign = 'center';
  countCircle.style.overflow = 'hidden';

  // --- 5. Responsive text sizing with maximum limits ---
  // For smaller circles (radius < 50), use 70% of radius for text scaling
  let textScale;
  if (radius < 50) {
    textScale = (radius * 0.7) / 50; // 70% of radius, normalized to base 50
  } else {
    textScale = Math.max(0.8, Math.min(2.0, size / 100)); // Cap at 2x scale for larger circles
  }

  // Count text with max size of 24px, min size of 12px
  const countFontSize = Math.max(12, Math.min(24, 16 * textScale));
  countText.style.fontSize = `${countFontSize}px`;
  countText.style.lineHeight = '1.2';
  countText.style.margin = '0';
  countText.textContent = String(count);

  // Country text with max size of 14px, min size of 12px
  const countryFontSize = Math.max(12, Math.min(14, 9 * textScale));
  countryText.style.fontSize = `${countryFontSize}px`;
  countryText.style.fontWeight = '400';
  countryText.style.lineHeight = '1.2';
  countryText.style.margin = '0';
  countryText.style.color = '#fff';
  countryText.style.wordBreak = 'break-word';
  countryText.style.hyphens = 'auto';
  countryText.style.whiteSpace = 'normal';
  countryText.style.maxWidth = '100%';
  countryText.textContent = country;

  countCircle.appendChild(countText);
  el.appendChild(countCircle);
  el.appendChild(countryText);

  return el;
}
