'use client';
import { useState } from 'react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

export function TeamMembers() {
    const [isOpen, setIsOpen] = useState(false);

    const teamMembers = [
    { name: 'Adelola Abioye', role: 'Scrum Master', linkedin: 'https://www.linkedin.com/in/adelola-abioye/'},
    { name: 'Andrew Smith', role: 'Developer', linkedin: 'https://www.linkedin.com/in/andrew-sm1th/'},
    { name: 'Gursimran', role: 'Developer', linkedin: 'https://www.linkedin.com/in/gursimransinghonly'},
    { name: 'Margaret Wu', role: 'Designer', linkedin: 'https://www.linkedin.com/in/margaretcwu/'},
    { name: 'Sabrina Shuss', role: 'Scrum Master', linkedin: 'https://www.linkedin.com/in/sabrinashuss/'},
    { name: 'Yuhang Zhou', role: 'Designer', linkedin: 'https://www.linkedin.com/in/yuhang-zhou-170b21148/'},
];

      return (
    <div className="relative flex justify-center">
      {/* Dropdown Content */}
      <div 
        className={`
          fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40
          sm:absolute sm:bottom-full sm:mb-2 sm:left-1/2 sm:-translate-x-1/2
          bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700
          transition-all duration-300 ease-in-out overflow-hidden
          w-[calc(100vw-2rem)] max-w-md sm:max-w-none sm:w-80 md:w-96
          max-h-80 overflow-y-auto
          ${isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="px-4 py-4 sm:px-4 sm:py-6">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-4">
            Team Members
          </h3>
          
          {/* Team Members List */}
          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <a
                key={index}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors group"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">
                      {member.name}
                    </p>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-chingu-green-100 transition-colors flex-shrink-0" />
                  </div>
                  
                  {/* Role */}
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {member.role}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          text-white text-xs
          flex items-center justify-center gap-1
          hover:text-gray-300 transition-colors
        "
      >
        {isOpen ? (
          <>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Hide Team</span>
          </>
        ) : (
          <>
            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Show Team</span>
          </>
        )}
      </button>
    </div>
  );
}
