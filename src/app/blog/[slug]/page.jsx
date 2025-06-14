

import Image from "next/image";
import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";

export default function Page({ params }) {
  const tempTags = "environment, pollution, space separation";
  return (
    <>
      <div className="px-4 py-6 sm:px-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/pollution.png"
            alt="Pollution Image"
            width={700}
            height={400}
            className="rounded-lg w-full h-auto max-w-3xl object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto p-5 sm:p-8 rounded-lg shadow-md mt-6 bg-gray-800/30">
          <div className="flex items-center mb-4 text-sm text-gray-400">
            <Calendar className="text-gray-500 inline mr-2" />
            <p>Published on: {dateFormat(new Date())}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <p className="text-gray-300 font-medium">Category:</p>
            <span className="text-gray-400 bg-gray-700 px-3 py-1 rounded-md text-sm">
              space separation
            </span>
          </div>


          <div className="flex flex-wrap items-center gap-2 mb-6">
            <p className="text-gray-300 font-medium">Tags:</p>
            {tempTags.split(",").map((tag, index) => (
              <span
                key={index}
                className="text-gray-400 bg-gray-700 px-3 py-1 rounded-md text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>


          <div className="text-gray-200 leading-relaxed text-sm sm:text-lg space-y-4">
            <p>
              Pollution refers to the introduction of harmful substances or
              products into the environment, causing adverse changes. These
              contaminants can take the form of chemicals, noise, heat, or even
              light, and they can originate from natural sources or, more
              commonly, human activities. The most common types of pollution
              include air pollution, water pollution, soil pollution, and noise
              pollution.
            </p>
            <p>
              As industrialization and urbanization grow, the level of
              pollution around the world continues to rise, posing serious
              threats to both human health and the natural ecosystem. Air
              pollution is caused by the release of toxic gases and
              particulates into the atmosphere, primarily from vehicles,
              factories, and the burning of fossil fuels. It contributes to
              respiratory problems, cardiovascular diseases, and even cancer in
              humans. Harmful gases such as carbon monoxide, sulfur dioxide,
              and nitrogen oxides degrade air quality and contribute to climate
              change through the greenhouse effect. Cities with high traffic and
              industrial density often suffer from smog and poor visibility,
              severely affecting the quality of life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
