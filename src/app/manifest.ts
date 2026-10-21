import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Matdata Portal - चुनाव प्रबंधन व डिजिटल वॉर रूम',
    short_name: 'Matdata Portal',
    description: 'भारत का अग्रणी इलेक्शन मैनेजमेंट व वोटर डेटाबेस प्लेटफॉर्म। 1-सेकंड मतदाता पर्ची, WhatsApp ऑटोमेशन, बूथ-वार लाइव टर्नआउट।',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
