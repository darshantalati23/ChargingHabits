import React from 'react';
import './About.css';

const journeySteps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    ),
    title: "The Question",
    content: (
      <p>
        We started this project looking at a surprisingly simple question. Why do phone batteries degrade so quickly? Our initial idea was grounded in sustainability and smart energy. We wanted to see what real people actually do with their phones, so we threw together a Google Form and sent it out.
      </p>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M8 13h2"></path>
        <path d="M8 17h2"></path>
        <path d="M14 13h2"></path>
        <path d="M14 17h2"></path>
      </svg>
    ),
    title: "The Analysis",
    content: (
      <p>
        The responses rolled in. We ran a preliminary analysis using a few standard tools to see what the numbers were trying to tell us. The results were clear enough to push us forward. We completed the exploratory phase by proposing a better hardware model. It works completely without firmware access, a huge plus for everyday practicality.
      </p>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "The Push",
    content: (
      <p>
        That was when <a href="https://www.linkedin.com/in/prof-dr-anupam-rana-28017a18/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Prof. Anupam Rana</a>, encouraged us to publish a paper. It felt like a stretch at the time. With anecdotal help from senior, <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Akshat Panchasara</a>, on the data analysis side, we began the paper writing process.
      </p>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    ),
    title: "The Writing Process",
    content: (
      <p>
        The process was long... Very long. Under the guidance of <a href="https://www.linkedin.com/in/prof-dr-anupam-rana-28017a18/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Prof. Anupam Rana</a>, I <a href="https://www.linkedin.com/in/dkt-ekantik/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">(Darshan Talati)</a>, <a href="https://www.linkedin.com/in/dharmesh-upadhyay-470493354/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Dharmesh Upadhyay</a>, and <a href="https://www.linkedin.com/in/sahil-abbas-765b9531b/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Sahil Abbas</a> stayed the course to see the writing through to the absolute end. We poured everything into that draft. We finally sent it off to IEEE ICEMCSI Bengaluru.
      </p>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    ),
    title: "The Setback",
    content: (
      <>
        <p className="punchy-line">
          They rejected it.
        </p>
        <p>
          It stung for a bit. Rejections always do. But we regrouped, refined our approach, and aimed for another conference. We submitted the revised paper to <a href="https://ieeecicon.karnavatiuniversity.edu.in/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">IEEE CICON 2026</a>. And in the process, I completed this website and deep-dive data analysis.
        </p>
      </>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    title: "The Success",
    content: (
      <>
        <p className="punchy-line">
          This time, they accepted it.
        </p>
        <p>
          It was an incredibly validating moment for the entire team. A simple curiosity about charging habits had turned into a peer-reviewed publication. It proves that you do not always need a massive lab to find something worth sharing.
        </p>
        <p className="mt-4" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
          Special thanks to teammates <a href="https://www.linkedin.com/in/dev-sanghani-58b951321/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Dev Sanghani</a> and <a href="https://www.linkedin.com/in/ved-dhanani-18612631a/" target="_blank" rel="noopener noreferrer" className="hover-underline-anim">Ved Dhanani</a> who helped a lot during the initial exploratory project phase.
        </p>
      </>
    )
  }
];

export default function About() {
  return (
    <div className="page-shell about-container">
      <div className="about-header">
        <h1 className="page-title">The Journey Behind the Research Paper</h1>
        <p className="about-subtitle">From an exploratory project to IEEE CICON</p>
      </div>

      <div className="journey-timeline">
        {journeySteps.map((step, index) => (
          <div className="journey-step" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="step-icon-wrapper">
              {step.icon}
              {index < journeySteps.length - 1 && <div className="step-connector"></div>}
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              {step.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
