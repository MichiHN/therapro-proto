// src/pages/therapist/Rewards.jsx
import TherapistSidebarLayout from "../../components/TherapistSidebarLayout"
import { motion } from "framer-motion"
import { Star } from "lucide-react" // simple icon library

export default function Rewards() {
  // Rewards data (images stored in /public/rewards)
  const rewards = [
    {
      title: "Laundry Master",
      description: "Awarded for completing all levels of the Sort Laundry Game.",
      image: "/rewards/laundry champ nonpx from pngtree.png",
      stars: 3,
    },
    {
      title: "Handwashing Hero",
      description: "Earned by finishing all levels of the Wash Hands Game.",
      image: "/rewards/pngtree-creative-art-of-beautifull-boy-in-white-t-shirt-washing-hands-png-image_13755041.png",
      stars: 4,
    },
    {
      title: "Consistency Champion",
      description: "Given for completing the all the activities during cycle.",
      image: "/rewards/consistent boy ai image.png",
      stars: 5,
    },
    {
      title: "Level Up Legend",
      description: "Unlock this by reaching the highest level in any game.",
      image: "/rewards/level up boy ai.png",
      stars: 2,
    },
  ]

  return (
    <TherapistSidebarLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Unlockable Achievements</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-green-50 rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={reward.image}
                alt={reward.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{reward.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{reward.description}</p>

              {/* Stars */}
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < reward.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TherapistSidebarLayout>
  )
}
