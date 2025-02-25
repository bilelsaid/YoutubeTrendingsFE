import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("TN");
  const [category, setCategory] = useState("");

  // Fetch videos from our API route
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
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever region or category changes
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>YouTube Trending Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Trending Videos</h1>
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
              <option className="bg-white text-gray-700" value="TN">Tunisia</option>
              <option className="bg-white text-gray-700" value="US">United States</option>
              <option className="bg-white text-gray-700" value="GB">United Kingdom</option>
              <option className="bg-white text-gray-700" value="FR">France</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option className="bg-white text-gray-700" value="">All</option>
              <option className="bg-white text-gray-700" value="1">Film & Animation</option>
              <option className="bg-white text-gray-700" value="2">Autos & Vehicles</option>
              <option className="bg-white text-gray-700" value="10">Music</option>
              <option className="bg-white text-gray-700" value="15">Pets & Animals</option>
              <option className="bg-white text-gray-700" value="17">Sports</option>
              <option className="bg-white text-gray-700" value="18">Short Movies</option>
              <option className="bg-white text-gray-700" value="19">Travel & Events</option>
              <option className="bg-white text-gray-700" value="20">Gaming</option>
              <option className="bg-white text-gray-700" value="21">Videoblogging</option>
              <option className="bg-white text-gray-700" value="22">People & Blogs</option>
              <option className="bg-white text-gray-700" value="23">Comedy</option>
              <option className="bg-white text-gray-700" value="24">Entertainment</option>
              <option className="bg-white text-gray-700" value="25">News & Politics</option>
              <option className="bg-white text-gray-700" value="26">Howto & Style</option>
              <option className="bg-white text-gray-700" value="27">Education</option>
              <option className="bg-white text-gray-700" value="28">Science & Technology</option>
              <option className="bg-white text-gray-700" value="29">Nonprofits & Activism</option>
            </select>
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Ranking badge with big number */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-5xl font-bold text-gray-200 opacity-75">
                    {index + 1}
                  </span>
                </div>
                <img
                  src={video.snippet.thumbnails.medium.url}
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
      </div>
    </div>
  );
}
