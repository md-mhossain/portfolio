import { FaPhone } from "react-icons/fa";
import Button from "./Button.jsx";
import { TextEffect } from "./ui/TextEffect.jsx";
import { motion } from "framer-motion";

const Hero = () => {
    const word =
        "Building the world's best marketing websites for over a decade. Your trusted partner for strategy, design, and dev.";

    return (
        <div className="py-14 md:py-18 dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen relative overflow-hidden">
            
            {/* Background */}
            <div className="absolute top-12 md:top-0 -z-10 w-full">
                <img
                    src="/images/bg-gradiant1.svg"
                    alt="gradiant-image"
                    className="w-full opacity-50 dark:opacity-30"
                />
            </div>

            {/* Main Content */}
            <div className="container z-10 relative px-4 sm:px-6 md:px-0 md:pl-28 text-center md:text-left">
                
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="tracking-wide text-3xl sm:text-4xl md:text-6xl lg:text-[78px] font-semibold md:font-bold leading-tight md:leading-[1.1]"
                >
                    <span>
                        Trusted{" "}
                        <span className="bg-black dark:bg-white text-white dark:text-black rounded px-2">
                            Partner
                        </span>{" "}
                        for <br className="hidden sm:block" />
                    </span>

                    Your Website{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-lime-500 text-white dark:text-black rounded px-3">
                        Develop.
                    </span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-12 py-10">
                    
                    <div className="md:col-span-9 space-y-6 text-center md:text-left">
                        
                        <div className="max-w-xl mx-auto md:mx-0">
                            <TextEffect
                                words={word}
                                className="text-sm sm:text-base md:text-lg opacity-80"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center md:justify-start"
                        >
                            <Button
                                className="group py-3 px-6 sm:px-8 border-2 border-teal-500/50 dark:border-white/20 rounded-full transition-all hover:bg-gradient-to-r hover:from-teal-400 hover:to-lime-500 hover:border-transparent hover:text-black font-bold"
                                icon={
                                    <FaPhone className="group-hover:rotate-[360deg] duration-500" />
                                }
                                text="Show my work"
                                path={"/projects"}
                            />
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;