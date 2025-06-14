
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { SquarePen, Layers, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center px-4 text-center">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="text-gray-100 text-3xl sm:text-4xl font-bold">
            Manage your content effectively
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Streamline your content workflow with our intuitive tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link href="/blogs" className="bg-gray-200 hover:bg-gray-400 text-gray-900 text-[0.8rem] font-semibold py-2 px-4 rounded-md transition-colors">
              Get Started
            </Link>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-600/20 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[SquarePen, Layers, Zap].map((Icon, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Icon className="h-12 w-12 text-white" />
              <div className="mt-6">
                <h4 className="text-gray-100 text-lg font-medium">
                  Streamline your content workflow
                </h4>
                <p className="text-gray-400 text-sm mt-2">
                  Use our tools to simplify and enhance your content process.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full py-16 px-4 bg-transparent">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-gray-100 text-2xl sm:text-3xl text-center">
            Ready To Change Your Content Journey?
          </h2>
          <p className="text-gray-400 text-center mt-2">
            Join Thousands of Users in Transforming Their Content Experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full justify-center">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full sm:w-80 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              variant="default"
              className="bg-gray-200 hover:bg-gray-400 w-full sm:w-auto"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

