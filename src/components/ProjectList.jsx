import { CardEffect } from "./ui/CardEffect.jsx";
import React from "react";
import ButtonComponent from "./ButtonComponent.jsx";
import { projects } from "../constants/data.js";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const ProjectList = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-0">
        <div className="mb-10">
          <ButtonComponent
            text="Recent Projects"
            className="border-black dark:border-white text-black dark:text-white"
          />

          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="font-bold text-black dark:text-white text-[40px] md:text-[58px] md:leading-[86px]"
          >
            Featured Projects
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {projects.map(({ id, title, description, image, tags, github, live }) => (
            <div key={id}>
              <CardEffect className="rounded-[22px] w-full h-full bg-white dark:bg-zinc-900 overflow-hidden">
                
                {/* IMAGE FIXED */}
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />

                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">
                    {title}
                  </h3>

                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 py-4">
                    {tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-gray-800 dark:text-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-3">
                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                        title="Live Site"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}

                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                        title="GitHub Repo"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </CardEffect>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectList;