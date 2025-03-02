import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: { url: string };
      high?: { url: string };
      maxres?: { url: string };
    };
  };
  statistics: {
    viewCount: string;
  };
}

const getThumbnail = (video: Video) =>
  video.snippet.thumbnails.maxres?.url ||
  video.snippet.thumbnails.high?.url ||
  video.snippet.thumbnails.medium.url;

// List of all countries
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, the Democratic Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran, Islamic Republic of" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MK", name: "Macedonia, the Former Yugoslav Republic of" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia, Federated States of" },
  { code: "MD", name: "Moldova, Republic of" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SZ", name: "Swaziland" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela, Bolivarian Republic of" },
  { code: "VN", name: "Viet Nam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" }
];

function Logo() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="384"
      height="216"
      viewBox="0 0 3840 2160"
    >
      <rect width="3840" height="2160" fill="#000000" />
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FF4500", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="45%"
        fill="url(#textGradient)"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="200"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        TubePulse
      </text>
      <path
        d="M600,1200 L800,1200 L850,1150 L900,1250 L950,1150 L1000,1300 L1400,1300"
        stroke="#FFFFFF"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="40,20"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-2000"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("TN");
  const [category, setCategory] = useState("");

  const fetchVideos = async () => {
    setLoading(true);
    try {
      let url = `/api/videos?region=${region}`;
      if (category) {
        url += `&category=${category}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [region, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>🔥 YouTube Trending Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header with Logo */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <Logo />
        </div>
        <h1 className="text-3xl font-bold text-center">🔥 Trendify 🔥</h1>
      </header>

      {/* Filters */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-6">
          <div>
            <label className="block text-gray-700 mb-1">Country:</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  className="bg-white text-gray-700"
                  value={country.code}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option className="bg-white text-gray-700" value="">
                All
              </option>
              <option className="bg-white text-gray-700" value="1">
                Film & Animation
              </option>
              <option className="bg-white text-gray-700" value="2">
                Autos & Vehicles
              </option>
              <option className="bg-white text-gray-700" value="10">
                Music
              </option>
              <option className="bg-white text-gray-700" value="15">
                Pets & Animals
              </option>
              <option className="bg-white text-gray-700" value="17">
                Sports
              </option>
              <option className="bg-white text-gray-700" value="18">
                Short Movies
              </option>
              <option className="bg-white text-gray-700" value="19">
                Travel & Events
              </option>
              <option className="bg-white text-gray-700" value="20">
                Gaming
              </option>
              <option className="bg-white text-gray-700" value="21">
                Videoblogging
              </option>
              <option className="bg-white text-gray-700" value="22">
                People & Blogs
              </option>
              <option className="bg-white text-gray-700" value="23">
                Comedy
              </option>
              <option className="bg-white text-gray-700" value="24">
                Entertainment
              </option>
              <option className="bg-white text-gray-700" value="25">
                News & Politics
              </option>
              <option className="bg-white text-gray-700" value="26">
                Howto & Style
              </option>
              <option className="bg-white text-gray-700" value="27">
                Education
              </option>
              <option className="bg-white text-gray-700" value="28">
                Science & Technology
              </option>
              <option className="bg-white text-gray-700" value="29">
                Nonprofits & Activism
              </option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : (
          <>
            {/* Podium Section */}
            {videos.length >= 3 && (
              <div className="mb-10">
                <div className="flex justify-center items-end space-x-4">
                  {/* SECOND PLACE */}
                  <motion.a
                    key={videos[1].id}
                    href={`https://www.youtube.com/watch?v=${videos[1].id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '30%' }}
                  >
                    <div className="relative" style={{ height: '200px' }}>
                      <div className="absolute top-2 left-2 z-10 flex flex-col items-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                          <span className="text-white text-xl font-bold">2</span>
                        </div>
                        <span className="mt-1 text-2xl font-bold text-white">🥈</span>
                      </div>
                      <img
                        src={getThumbnail(videos[1])}
                        alt={videos[1].snippet.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                        {videos[1].snippet.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {Number(videos[1].statistics.viewCount).toLocaleString()} views
                      </p>
                    </div>
                  </motion.a>

                  {/* FIRST PLACE */}
                  <motion.a
                    key={videos[0].id}
                    href={`https://www.youtube.com/watch?v=${videos[0].id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '40%' }}
                  >
                    <div className="relative" style={{ height: '250px' }}>
                      <div className="absolute top-2 left-2 z-10 flex flex-col items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full">
                          <span className="text-white text-3xl font-bold">1</span>
                        </div>
                        <span className="mt-1 text-2xl font-bold text-white">🥇</span>
                      </div>
                      <img
                        src={getThumbnail(videos[0])}
                        alt={videos[0].snippet.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {videos[0].snippet.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {Number(videos[0].statistics.viewCount).toLocaleString()} views
                      </p>
                    </div>
                  </motion.a>

                  {/* THIRD PLACE */}
                  <motion.a
                    key={videos[2].id}
                    href={`https://www.youtube.com/watch?v=${videos[2].id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '30%' }}
                  >
                    <div className="relative" style={{ height: '180px' }}>
                      <div className="absolute top-2 left-2 z-10 flex flex-col items-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                          <span className="text-white text-xl font-bold">3</span>
                        </div>
                        <span className="mt-1 text-2xl font-bold text-white">🥉</span>
                      </div>
                      <img
                        src={getThumbnail(videos[2])}
                        alt={videos[2].snippet.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                        {videos[2].snippet.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {Number(videos[2].statistics.viewCount).toLocaleString()} views
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            )}

            {/* Separator */}
            {videos.length > 3 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Other Trending Videos
                </h2>
              </div>
            )}

            {/* Grid for the Rest of the Videos */}
            {videos.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.slice(3).map((video, idx) => (
                  <motion.a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block bg-white rounded-lg shadow-md overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-2 left-2 z-10 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                      <span className="text-white text-xl font-bold">
                        {idx + 4}
                      </span>
                    </div>
                    <img
                      src={getThumbnail(video)}
                      alt={video.snippet.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {video.snippet.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        {Number(video.statistics.viewCount).toLocaleString()} views
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
