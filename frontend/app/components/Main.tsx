'use client';
import MainImage from '../images/main_page_1.jpg'
import Image from 'next/image';
export default function Main() {
  return (
    <section className="text-gray-200 bg-black body-font">
      <div className="max-w-7xl mx-auto flex px-1 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
          <h1 className="mt-10 mb-8 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-white">
            We simplify Research Literature Review
          </h1>
          <p className="mb-4 xl:w-3/4 text-gray-400 text-lg">
            Research is a free-to-use resarch paper finder and summarizer tool
          </p>
          <div className="flex justify-center">
            <a
              className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white bg-gray-900 rounded-md"
              href="/login"
            >
              <span className="justify-center">Login</span>
            </a>
          </div>
        </div>
        {/* <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
          <Image
            className="w-80 md:ml-1 ml-24"
            alt="Research Paper Image"
            src={MainImage}
            width={320}      
            height={640}     
            priority         
          />
        </div> */}
        <div className="ml-4 h-screen w-1/2 relative">
          <Image
            className="object-cover"
            alt="Research Paper Image"
            src={MainImage}
            layout="fill"     
            objectFit="cover"
            // priority          
            loading="lazy"    
            placeholder="blur" 
            sizes="(max-width: 768px) 10vw, 10vw"
          />
        </div>
      </div>
    </section>
  );
}
