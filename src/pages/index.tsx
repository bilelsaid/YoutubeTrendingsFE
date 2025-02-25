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
                    {/* Image Container */}
                    <div className="relative" style={{ height: '200px' }}>
                      {/* Medal Badge with Rank */}
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
                    {/* Text Info */}
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
