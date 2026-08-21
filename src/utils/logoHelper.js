export function getLogoUrl(startup) {
  if (startup.logoUrl && startup.logoUrl.trim() !== '') {
    return startup.logoUrl;
  }
  if (startup.website && startup.website.startsWith('http')) {
    try {
      const urlObj = new URL(startup.website);
      const hostname = urlObj.hostname.replace(/^www\./, '').toLowerCase();
      
      // Exclude generic directory & government platform domains
      const genericDomains = [
        'example.com',
        'ecosystem',
        'startupindia.gov.in',
        'linkedin.com',
        'facebook.com',
        'instagram.com',
        'twitter.com',
        'youtube.com',
        'justdial.com',
        'chatgpt.com',
        'tracxn.com',
        'crunchbase.com'
      ];

      const isGeneric = genericDomains.some(domain => hostname.includes(domain));
      if (hostname && !isGeneric) {
        // High-definition 256px resolution for crystal-clear retina rendering
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=256`;
      }
    } catch (e) {
      // fallback if invalid URL
    }
  }
  return null;
}
