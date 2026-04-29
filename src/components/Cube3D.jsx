import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cube3D = ({ faces }) => {
  const [selectedFace, setSelectedFace] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {faces.map((face, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 to-purple-950/10 backdrop-blur"
          >
            <div className="text-3xl font-space-grotesk font-bold text-indigo-400 mb-2">{i + 1}</div>
            <h4 className="font-space-grotesk font-bold text-white mb-2">{face.title}</h4>
            <p className="text-slate-400 font-dm-sans text-sm">{face.description}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* 3D Cube */}
      <div className="h-96 flex items-center justify-center perspective">
        <style>{`
          .cube-container {
            width: 300px;
            height: 300px;
            position: relative;
            transform-style: preserve-3d;
            animation: rotate-cube 20s infinite linear;
          }
          @keyframes rotate-cube {
            from { transform: rotateX(0deg) rotateY(0deg); }
            to { transform: rotateX(360deg) rotateY(360deg); }
          }
          .cube-face {
            position: absolute;
            width: 300px;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(99, 102, 241, 0.3);
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .cube-face:hover {
            border-color: rgba(99, 102, 241, 0.6);
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
          }
          .face-1 { transform: rotateY(0deg) translateZ(150px); }
          .face-2 { transform: rotateY(90deg) translateZ(150px); }
          .face-3 { transform: rotateY(180deg) translateZ(150px); }
          .face-4 { transform: rotateY(270deg) translateZ(150px); }
        `}</style>

        <div className="cube-container">
          {faces.map((face, i) => (
            <div
              key={i}
              className={`cube-face face-${i + 1}`}
              onClick={() => setSelectedFace(i)}
            >
              <div className="text-5xl font-space-grotesk font-bold text-indigo-400 mb-3">{i + 1}</div>
              <div className="text-sm font-space-grotesk font-bold text-white">{face.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="space-y-4">
        {faces.map((face, i) => (
          <motion.div
            key={i}
            onClick={() => setSelectedFace(i)}
            animate={{
              scale: selectedFace === i ? 1.05 : 1,
              borderColor: selectedFace === i ? 'rgba(168, 85, 247, 0.5)' : 'rgba(99, 102, 241, 0.2)'
            }}
            className={`p-6 rounded-xl cursor-pointer border-2 transition ${
              selectedFace === i
                ? 'bg-purple-950/30 border-purple-500/50'
                : 'bg-slate-900/20 border-indigo-500/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl font-space-grotesk font-bold text-indigo-400 min-w-fit">
                {i + 1}
              </div>
              <div>
                <h4 className="font-space-grotesk font-bold text-white mb-1">{face.title}</h4>
                <p className="text-slate-400 font-dm-sans text-sm">{face.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cube3D;
