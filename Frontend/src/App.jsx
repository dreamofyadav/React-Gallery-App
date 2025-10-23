import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["About Me", "Experiences", "Recommended"];

export default function App() {
  const [activeTab, setActiveTab] = useState("About Me");
  const [images, setImages] = useState([]);

  const [startIndex, setStartIndex] = useState(0); // for gallery pagination
  const imagesPerPage = 3;
  // handle image upload from local system
  const handleAddImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (startIndex + imagesPerPage < images.length) {
      setStartIndex(startIndex + imagesPerPage);
    }
  };
  const handlePrev = () => {
    if (startIndex - imagesPerPage >= 0) {
      setStartIndex(startIndex - imagesPerPage);
    }
  };

  const tabContent = {
    "About Me": (
      <p className="text-gray-300">
        Hello! I'm Aakash Yadav and I’m currently in my final year of B.Tech in Computer Science and Engineering at Shri Siddhivinayak Group of Institute.
        I’m passionate about web development and have hands-on experience with the MERN stack — MongoDB, Express.js, React, and Node.js.
        I’ve built several projects, including a BlogPost website, a Rentify website for property rentals, and a few other web apps that helped me strengthen my frontend and backend development skills.
        I’m now looking for an opportunity where I can apply my technical knowledge, learn from real-world challenges, and grow as a Full Stack Developer.
      </p>
    ),
    Experiences: (
      <p className="text-gray-300">
        Although I don’t have company-level or production experience yet, 
        I have gained solid hands-on experience by building multiple personal and academic projects using the MERN stack.
        These projects have helped me understand real-world development workflows like API integration, database design, and deployment
      </p>
    ),
    Recommended: (
      <p className="text-gray-300">
        I just need an opportunity to prove my skills and demonstrate my passion for full stack development through real-world projects.
      </p>
    ),
  };

  return (
    <div className="flex min-h-screen items-center justify-end p-10 bg-gray-900">
      <div className="w-full max-w-xl space-y-6">
        {/* --- Tabs Widget --- */}
        <motion.div
          className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-700 pb-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 text-sm font-medium transition-all ${activeTab === tab
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content with animation */}
          <div className="mt-4 text-sm leading-relaxed min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- Gallery Widget --- */}
        <motion.div
          className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl p-6"
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <motion.button
              className="text-white font-semibold bg-gray-700 px-3 py-1 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              Gallery
            </motion.button>

            <div className="flex items-center gap-3">
              {/* Local upload button */}
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 cursor-pointer transition"
              >
                + Add Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
              />

              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className={`p-2 rounded-lg ${startIndex === 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
              >
                ←
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + imagesPerPage >= images.length}
                className={`p-2 rounded-lg ${startIndex + imagesPerPage >= images.length
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
              >
                →
              </button>
            </div>
          </div>

          {/* Image grid ke liye */}
          <motion.div layout className="grid grid-cols-3 gap-4">
            {/* <AnimatePresence> */}
            {images.slice(startIndex, startIndex + imagesPerPage)
              .map((img, i) => (
                <motion.div
                  key={img + i}
                  layout
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    boxShadow: "0px 8px 25px rgba(59,130,246,0.4)",
                    transition: { type: "spring", stiffness: 220 },
                  }}
                  className="aspect-square bg-gray-700 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </motion.div>

              ))}
            {/* </AnimatePresence> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
